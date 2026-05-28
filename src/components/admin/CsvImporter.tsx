'use client'

import { useState, useRef, useTransition } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {
  Upload, Download, CheckCircle, XCircle,
  AlertTriangle, Loader2, FileSpreadsheet, Trash2, Info,
} from 'lucide-react'
import type { Category } from '@/types/database'

interface Props {
  categories: Category[]
}

// Shape of one parsed CSV row
interface CsvRow {
  name: string
  description: string
  category: string          // category name (matched to id)
  price: string
  price_quarter: string
  price_half: string
  price_full: string
  image_url: string
  is_veg: string
  is_spicy: string
  is_bestseller: string
  is_chef_special: string
  is_available: string
}

// After validation
interface ValidatedRow extends CsvRow {
  _rowIndex: number
  _categoryId: string | null
  _errors: string[]
  _valid: boolean
}

const REQUIRED_COLUMNS = ['name', 'category', 'price']
const ALL_COLUMNS = [
  'name', 'description', 'category',
  'price', 'price_quarter', 'price_half', 'price_full',
  'image_url', 'is_veg', 'is_spicy', 'is_bestseller', 'is_chef_special', 'is_available',
]

const SAMPLE_CSV = `name,description,category,price,price_quarter,price_half,price_full,image_url,is_veg,is_spicy,is_bestseller,is_chef_special,is_available
Champaran Mutton,Slow-cooked mutton in earthy spices,Main Course,,,350,650,,false,true,true,true,true
Litti Chokha,Traditional litti with roasted chokha,Starters,120,,,,,true,false,true,false,true
Sattu Paratha,Crispy paratha stuffed with roasted sattu,Starters,80,,,,,true,false,false,false,true
Dal Baati,Baked baati with panchmel dal,Main Course,,,200,380,,true,false,false,true,true
Kheer,Creamy rice kheer with cardamom,Desserts,80,,,,,true,false,false,false,true
Masala Chai,Freshly brewed spiced tea,Drinks,30,,,,,true,false,true,false,true
`

function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.trim().split('\n').filter(Boolean)
  if (lines.length < 2) return { headers: [], rows: [] }

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'))
  const rows = lines.slice(1).map((line) => {
    // Handle quoted fields with commas inside
    const values: string[] = []
    let current = ''
    let inQuotes = false
    for (const char of line) {
      if (char === '"') { inQuotes = !inQuotes }
      else if (char === ',' && !inQuotes) { values.push(current.trim()); current = '' }
      else { current += char }
    }
    values.push(current.trim())

    return headers.reduce((obj, header, i) => {
      obj[header] = (values[i] ?? '').replace(/^"|"$/g, '').trim()
      return obj
    }, {} as Record<string, string>)
  })

  return { headers, rows }
}

function validateRows(rows: Record<string, string>[], categories: Category[]): ValidatedRow[] {
  const catMap = new Map(categories.map((c) => [c.name.toLowerCase().trim(), c.id]))

  return rows.map((row, i) => {
    const errors: string[] = []

    if (!row.name?.trim()) errors.push('Name is required')

    const catKey = row.category?.toLowerCase().trim()
    const categoryId = catMap.get(catKey) ?? null
    if (!catKey) errors.push('Category is required')
    else if (!categoryId) errors.push(`Category "${row.category}" not found — create it first`)

    const hasAnyPrice = row.price || row.price_quarter || row.price_half || row.price_full
    if (!hasAnyPrice) errors.push('At least one price is required')

    const numFields = ['price', 'price_quarter', 'price_half', 'price_full']
    for (const f of numFields) {
      if (row[f] && isNaN(parseFloat(row[f]))) errors.push(`${f} must be a number`)
    }

    return {
      ...(row as unknown as CsvRow),
      _rowIndex: i + 2, // 1-indexed, +1 for header
      _categoryId: categoryId,
      _errors: errors,
      _valid: errors.length === 0,
    }
  })
}

function toBool(val: string): boolean {
  return ['true', '1', 'yes'].includes(val?.toLowerCase().trim())
}

export function CsvImporter({ categories }: Props) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const fileRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<ValidatedRow[]>([])
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState<{ success: number; failed: number } | null>(null)
  const [missingCols, setMissingCols] = useState<string[]>([])

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a .csv file')
      return
    }
    setFileName(file.name)
    setImportResult(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const { headers: parsedHeaders, rows: parsedRows } = parseCsv(text)

      const missing = REQUIRED_COLUMNS.filter((c) => !parsedHeaders.includes(c))
      setMissingCols(missing)

      if (missing.length > 0) {
        setRows([])
        setHeaders(parsedHeaders)
        return
      }

      setHeaders(parsedHeaders)
      setRows(validateRows(parsedRows, categories))
    }
    reader.readAsText(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const validRows = rows.filter((r) => r._valid)
  const invalidRows = rows.filter((r) => !r._valid)

  const handleImport = async () => {
    if (validRows.length === 0) return
    setImporting(true)

    const payload = validRows.map((row) => ({
      name: row.name.trim(),
      description: row.description?.trim() ?? '',
      category_id: row._categoryId!,
      price: row.price_full
        ? parseFloat(row.price_full)
        : row.price ? parseFloat(row.price) : 0,
      price_quarter: row.price_quarter ? parseFloat(row.price_quarter) : null,
      price_half: row.price_half ? parseFloat(row.price_half) : null,
      price_full: row.price_full ? parseFloat(row.price_full) : null,
      image_url: row.image_url?.trim() || null,
      is_veg: toBool(row.is_veg),
      is_spicy: toBool(row.is_spicy),
      is_bestseller: toBool(row.is_bestseller),
      is_chef_special: toBool(row.is_chef_special),
      is_available: row.is_available === '' ? true : toBool(row.is_available),
    }))

    // Insert in batches of 50
    let successCount = 0
    let failCount = 0
    const BATCH = 50

    for (let i = 0; i < payload.length; i += BATCH) {
      const batch = payload.slice(i, i + BATCH)
      const { error } = await (supabase as any).from('menu_items').insert(batch)
      if (error) {
        failCount += batch.length
        console.error('Batch insert error:', error)
      } else {
        successCount += batch.length
      }
    }

    setImporting(false)
    setImportResult({ success: successCount, failed: failCount })

    if (successCount > 0) {
      toast.success(`${successCount} dishes imported successfully!`)
      startTransition(() => router.refresh())
    }
    if (failCount > 0) {
      toast.error(`${failCount} rows failed to import`)
    }
  }

  const handleReset = () => {
    setRows([])
    setHeaders([])
    setFileName('')
    setMissingCols([])
    setImportResult(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const downloadTemplate = () => {
    const blob = new Blob([SAMPLE_CSV], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'menu-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl text-[rgb(245_240_235)]">CSV Import</h1>
          <p className="text-sm text-[rgb(120_100_85)] mt-1">
            Bulk upload menu items from a spreadsheet
          </p>
        </div>
        <button
          onClick={downloadTemplate}
          className="btn-outline flex items-center gap-2 self-start"
        >
          <Download size={14} />
          Download Template
        </button>
      </div>

      {/* Column guide */}
      <div className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Info size={14} className="text-[rgb(196_142_72)]" />
          <p className="text-xs tracking-wider uppercase text-[rgb(196_142_72)] font-semibold">
            CSV Column Reference
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {[
            { col: 'name', note: 'Required', req: true },
            { col: 'category', note: 'Required — must match existing category name', req: true },
            { col: 'price', note: 'Required if no portion prices', req: true },
            { col: 'description', note: 'Optional' },
            { col: 'price_quarter', note: 'Optional' },
            { col: 'price_half', note: 'Optional' },
            { col: 'price_full', note: 'Optional' },
            { col: 'image_url', note: 'Optional' },
            { col: 'is_veg', note: 'true / false' },
            { col: 'is_spicy', note: 'true / false' },
            { col: 'is_bestseller', note: 'true / false' },
            { col: 'is_chef_special', note: 'true / false' },
            { col: 'is_available', note: 'true / false (default: true)' },
          ].map(({ col, note, req }) => (
            <div key={col} className="flex items-start gap-1.5">
              <code className={`text-xs px-1.5 py-0.5 rounded-sm font-mono ${
                req
                  ? 'bg-[rgb(196_142_72/0.15)] text-[rgb(196_142_72)] border border-[rgb(196_142_72/0.3)]'
                  : 'bg-[rgb(30_22_18)] text-[rgb(160_140_120)] border border-[rgb(40_30_24)]'
              }`}>
                {col}
              </code>
              <span className="text-[0.65rem] text-[rgb(100_85_70)] mt-0.5 leading-tight">{note}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-[rgb(80_65_55)] mt-3">
          Existing categories: {categories.length === 0
            ? 'None — add categories first'
            : categories.map((c) => <span key={c.id} className="text-[rgb(140_120_100)]">{c.name}</span>).reduce((a, b) => <>{a}, {b}</>)
          }
        </p>
      </div>

      {/* Drop zone */}
      {rows.length === 0 && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-[rgb(45_35_28)] hover:border-[rgb(196_142_72/0.5)] rounded-sm p-12 text-center cursor-pointer transition-colors group mb-6"
        >
          <FileSpreadsheet size={36} className="mx-auto mb-3 text-[rgb(80_65_55)] group-hover:text-[rgb(196_142_72)] transition-colors" />
          <p className="text-[rgb(200_185_165)] font-medium mb-1">
            Drop your CSV file here
          </p>
          <p className="text-sm text-[rgb(100_85_70)]">
            or click to browse — .csv files only
          </p>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}

      {/* Missing columns error */}
      {missingCols.length > 0 && (
        <div className="bg-red-950/30 border border-red-800/40 rounded-sm p-4 mb-6 flex items-start gap-3">
          <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-300">Missing required columns</p>
            <p className="text-xs text-red-400/80 mt-1">
              Your CSV is missing: <strong>{missingCols.join(', ')}</strong>
            </p>
            <p className="text-xs text-red-400/60 mt-1">
              Download the template above to see the correct format.
            </p>
          </div>
        </div>
      )}

      {/* Preview table */}
      {rows.length > 0 && (
        <>
          {/* Summary bar */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <FileSpreadsheet size={14} className="text-[rgb(196_142_72)]" />
              <span className="text-[rgb(200_185_165)] font-medium">{fileName}</span>
            </div>
            <span className="text-[rgb(60_45_35)]">·</span>
            <span className="flex items-center gap-1.5 text-sm text-green-400">
              <CheckCircle size={13} />
              {validRows.length} ready
            </span>
            {invalidRows.length > 0 && (
              <span className="flex items-center gap-1.5 text-sm text-red-400">
                <XCircle size={13} />
                {invalidRows.length} with errors
              </span>
            )}
            <button
              onClick={handleReset}
              className="ml-auto flex items-center gap-1.5 text-xs text-[rgb(100_85_70)] hover:text-red-400 transition-colors"
            >
              <Trash2 size={12} />
              Clear
            </button>
          </div>

          {/* Import result banner */}
          {importResult && (
            <div className={`rounded-sm p-4 mb-4 flex items-center gap-3 ${
              importResult.failed === 0
                ? 'bg-green-950/30 border border-green-800/40'
                : 'bg-orange-950/30 border border-orange-800/40'
            }`}>
              <CheckCircle size={16} className="text-green-400 shrink-0" />
              <p className="text-sm text-green-300">
                <strong>{importResult.success}</strong> dishes imported.
                {importResult.failed > 0 && (
                  <span className="text-orange-300 ml-2">
                    {importResult.failed} failed.
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Table */}
          <div className="bg-[rgb(22_16_12)] border border-[rgb(35_26_20)] rounded-sm overflow-hidden mb-5">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[rgb(35_26_20)]">
                    <th className="text-left px-3 py-2.5 text-[rgb(100_85_70)] font-semibold tracking-wider uppercase w-8">#</th>
                    <th className="text-left px-3 py-2.5 text-[rgb(100_85_70)] font-semibold tracking-wider uppercase">Status</th>
                    <th className="text-left px-3 py-2.5 text-[rgb(100_85_70)] font-semibold tracking-wider uppercase">Name</th>
                    <th className="text-left px-3 py-2.5 text-[rgb(100_85_70)] font-semibold tracking-wider uppercase">Category</th>
                    <th className="text-left px-3 py-2.5 text-[rgb(100_85_70)] font-semibold tracking-wider uppercase">Price</th>
                    <th className="text-left px-3 py-2.5 text-[rgb(100_85_70)] font-semibold tracking-wider uppercase">Qtr / Half / Full</th>
                    <th className="text-left px-3 py-2.5 text-[rgb(100_85_70)] font-semibold tracking-wider uppercase">Flags</th>
                    <th className="text-left px-3 py-2.5 text-[rgb(100_85_70)] font-semibold tracking-wider uppercase">Issues</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgb(28_20_16)]">
                  {rows.map((row) => (
                    <tr
                      key={row._rowIndex}
                      className={`${row._valid ? 'hover:bg-[rgb(26_18_14)]' : 'bg-red-950/10'} transition-colors`}
                    >
                      <td className="px-3 py-2 text-[rgb(80_65_55)]">{row._rowIndex}</td>
                      <td className="px-3 py-2">
                        {row._valid
                          ? <CheckCircle size={13} className="text-green-400" />
                          : <XCircle size={13} className="text-red-400" />
                        }
                      </td>
                      <td className="px-3 py-2 text-[rgb(220_200_175)] font-medium max-w-[140px] truncate">
                        {row.name || <span className="text-red-400 italic">empty</span>}
                      </td>
                      <td className="px-3 py-2">
                        <span className={row._categoryId ? 'text-[rgb(160_140_120)]' : 'text-red-400'}>
                          {row.category || '—'}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-[rgb(196_142_72)]">
                        {row.price ? `₹${row.price}` : '—'}
                      </td>
                      <td className="px-3 py-2 text-[rgb(140_120_100)]">
                        {[
                          row.price_quarter && `Q:₹${row.price_quarter}`,
                          row.price_half    && `H:₹${row.price_half}`,
                          row.price_full    && `F:₹${row.price_full}`,
                        ].filter(Boolean).join(' · ') || '—'}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1 flex-wrap">
                          {toBool(row.is_veg)          && <span className="text-green-400 text-[0.6rem] uppercase font-bold">Veg</span>}
                          {toBool(row.is_spicy)         && <span className="text-orange-400 text-[0.6rem] uppercase font-bold">Spicy</span>}
                          {toBool(row.is_bestseller)    && <span className="text-[rgb(196_142_72)] text-[0.6rem] uppercase font-bold">Best</span>}
                          {toBool(row.is_chef_special)  && <span className="text-[rgb(196_142_72)] text-[0.6rem] uppercase font-bold">Chef</span>}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        {row._errors.length > 0 && (
                          <ul className="space-y-0.5">
                            {row._errors.map((err, i) => (
                              <li key={i} className="text-red-400 text-[0.65rem]">• {err}</li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleReset} className="btn-outline flex items-center gap-2">
              <Trash2 size={14} />
              Clear & Upload New
            </button>
            <button
              onClick={handleImport}
              disabled={importing || validRows.length === 0 || !!importResult}
              className="btn-primary flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {importing
                ? <><Loader2 size={14} className="animate-spin" /> Importing {validRows.length} rows...</>
                : importResult
                ? <><CheckCircle size={14} /> Import Complete</>
                : <><Upload size={14} /> Import {validRows.length} Valid Rows</>
              }
            </button>
            {invalidRows.length > 0 && (
              <p className="text-xs text-[rgb(100_85_70)] self-center">
                {invalidRows.length} row{invalidRows.length > 1 ? 's' : ''} with errors will be skipped
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
