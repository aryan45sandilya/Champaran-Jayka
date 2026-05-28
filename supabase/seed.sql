-- ============================================================
-- Ember & Oak Restaurant — Seed Data
-- ============================================================
-- Run this AFTER schema.sql to populate the database with
-- sample data for development and demonstration.
-- ============================================================

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO public.categories (id, name) VALUES
  ('a1b2c3d4-0001-0000-0000-000000000001', 'Starters'),
  ('a1b2c3d4-0002-0000-0000-000000000002', 'Main Course'),
  ('a1b2c3d4-0003-0000-0000-000000000003', 'Desserts'),
  ('a1b2c3d4-0004-0000-0000-000000000004', 'Drinks')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- MENU ITEMS — Starters
-- ============================================================
INSERT INTO public.menu_items
  (category_id, name, description, price, image_url, is_bestseller, is_available, is_veg, is_spicy, is_chef_special)
VALUES
  (
    'a1b2c3d4-0001-0000-0000-000000000001',
    'Seared Scallops',
    'Pan-seared diver scallops with cauliflower purée, crispy capers, and brown butter emulsion.',
    24.00,
    'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80&auto=format&fit=crop',
    TRUE, TRUE, FALSE, FALSE, TRUE
  ),
  (
    'a1b2c3d4-0001-0000-0000-000000000001',
    'Burrata & Heirloom Tomato',
    'Creamy burrata with heirloom tomatoes, aged balsamic, fresh basil oil, and sea salt.',
    18.00,
    'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, TRUE, FALSE, FALSE
  ),
  (
    'a1b2c3d4-0001-0000-0000-000000000001',
    'Wagyu Beef Tartare',
    'Hand-cut A5 wagyu with egg yolk, cornichons, Dijon, and toasted sourdough crisps.',
    32.00,
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop',
    TRUE, TRUE, FALSE, FALSE, TRUE
  ),
  (
    'a1b2c3d4-0001-0000-0000-000000000001',
    'Roasted Beet Salad',
    'Candy-striped beets with whipped goat cheese, candied walnuts, and citrus vinaigrette.',
    16.00,
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, TRUE, FALSE, FALSE
  ),
  (
    'a1b2c3d4-0001-0000-0000-000000000001',
    'Lobster Bisque',
    'Velvety bisque with Maine lobster, cognac cream, and chive oil.',
    22.00,
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, FALSE, FALSE, FALSE
  );

-- ============================================================
-- MENU ITEMS — Main Course
-- ============================================================
INSERT INTO public.menu_items
  (category_id, name, description, price, image_url, is_bestseller, is_available, is_veg, is_spicy, is_chef_special)
VALUES
  (
    'a1b2c3d4-0002-0000-0000-000000000002',
    'Dry-Aged Ribeye',
    '45-day dry-aged 16oz ribeye with bone marrow butter, roasted garlic, and truffle fries.',
    78.00,
    'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80&auto=format&fit=crop',
    TRUE, TRUE, FALSE, FALSE, TRUE
  ),
  (
    'a1b2c3d4-0002-0000-0000-000000000002',
    'Pan-Roasted Duck Breast',
    'Magret duck breast with cherry gastrique, parsnip purée, and wilted watercress.',
    52.00,
    'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&q=80&auto=format&fit=crop',
    TRUE, TRUE, FALSE, FALSE, FALSE
  ),
  (
    'a1b2c3d4-0002-0000-0000-000000000002',
    'Wild Mushroom Risotto',
    'Arborio rice with porcini, chanterelle, and truffle oil, finished with aged Parmigiano.',
    38.00,
    'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, TRUE, FALSE, FALSE
  ),
  (
    'a1b2c3d4-0002-0000-0000-000000000002',
    'Butter-Poached Lobster',
    'Maine lobster tail poached in clarified butter with saffron beurre blanc and asparagus.',
    68.00,
    'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600&q=80&auto=format&fit=crop',
    TRUE, TRUE, FALSE, FALSE, TRUE
  ),
  (
    'a1b2c3d4-0002-0000-0000-000000000002',
    'Spiced Lamb Rack',
    'Harissa-crusted lamb rack with pomegranate jus, roasted eggplant, and mint yogurt.',
    58.00,
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, FALSE, TRUE, FALSE
  ),
  (
    'a1b2c3d4-0002-0000-0000-000000000002',
    'Roasted Halibut',
    'Pacific halibut with lemon beurre blanc, fennel confit, and crispy capers.',
    54.00,
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, FALSE, FALSE, FALSE
  );

-- ============================================================
-- MENU ITEMS — Desserts
-- ============================================================
INSERT INTO public.menu_items
  (category_id, name, description, price, image_url, is_bestseller, is_available, is_veg, is_spicy, is_chef_special)
VALUES
  (
    'a1b2c3d4-0003-0000-0000-000000000003',
    'Valrhona Chocolate Fondant',
    'Warm dark chocolate fondant with salted caramel ice cream and hazelnut praline.',
    16.00,
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80&auto=format&fit=crop',
    TRUE, TRUE, TRUE, FALSE, FALSE
  ),
  (
    'a1b2c3d4-0003-0000-0000-000000000003',
    'Crème Brûlée',
    'Classic vanilla bean custard with a perfectly caramelised sugar crust and fresh berries.',
    14.00,
    'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, TRUE, FALSE, FALSE
  ),
  (
    'a1b2c3d4-0003-0000-0000-000000000003',
    'Seasonal Tart',
    'Buttery pâte sablée with pastry cream and the finest seasonal fruits from our farm partners.',
    15.00,
    'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, TRUE, FALSE, TRUE
  ),
  (
    'a1b2c3d4-0003-0000-0000-000000000003',
    'Cheese Selection',
    'A curated board of artisan cheeses with honeycomb, quince paste, and walnut bread.',
    22.00,
    'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, TRUE, FALSE, FALSE
  );

-- ============================================================
-- MENU ITEMS — Drinks
-- ============================================================
INSERT INTO public.menu_items
  (category_id, name, description, price, image_url, is_bestseller, is_available, is_veg, is_spicy, is_chef_special)
VALUES
  (
    'a1b2c3d4-0004-0000-0000-000000000004',
    'Ember Old Fashioned',
    'Smoked bourbon, demerara syrup, Angostura bitters, and a charred orange peel.',
    18.00,
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80&auto=format&fit=crop',
    TRUE, TRUE, TRUE, FALSE, FALSE
  ),
  (
    'a1b2c3d4-0004-0000-0000-000000000004',
    'Garden Spritz',
    'Elderflower liqueur, cucumber, fresh mint, prosecco, and a splash of lime.',
    16.00,
    'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, TRUE, FALSE, FALSE
  ),
  (
    'a1b2c3d4-0004-0000-0000-000000000004',
    'Reserve Burgundy',
    'Domaine de la Romanée-Conti, Vosne-Romanée 2018. Silky, complex, and unforgettable.',
    45.00,
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, TRUE, FALSE, TRUE
  ),
  (
    'a1b2c3d4-0004-0000-0000-000000000004',
    'Sparkling Water',
    'San Pellegrino or Acqua Panna still water, served chilled.',
    6.00,
    NULL,
    FALSE, TRUE, TRUE, FALSE, FALSE
  ),
  (
    'a1b2c3d4-0004-0000-0000-000000000004',
    'Espresso Martini',
    'Freshly pulled espresso, vodka, Kahlúa, and a touch of vanilla syrup.',
    17.00,
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80&auto=format&fit=crop',
    FALSE, TRUE, TRUE, FALSE, FALSE
  );
