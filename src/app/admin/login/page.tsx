import { LoginForm } from '@/components/admin/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[rgb(10_7_5)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl text-[rgb(245_240_235)] mb-1">
            Champaran&apos;s Jayka
          </h1>
          <p className="text-xs tracking-[0.25em] uppercase text-[rgb(196_142_72)]">
            Admin Portal
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-xs text-[rgb(80_65_55)] mt-8">
          This area is restricted to authorised staff only.
        </p>
      </div>
    </div>
  )
}
