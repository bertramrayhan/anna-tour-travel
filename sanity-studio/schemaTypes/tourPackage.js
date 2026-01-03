import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'tourPackage',
  title: 'Paket Tur',
  type: 'document',
  fields: [
    // --- Informasi Inti ---
    defineField({
      name: 'title',
      title: 'Nama Paket Tur',
      type: 'string',
      description: 'Contoh: "Petualangan Bromo Sunrise" atau "Pesona Budaya Bali"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Unik)',
      type: 'slug',
      description: 'Dibutuhkan untuk link ke halaman detail nanti. Klik "Generate" untuk membuatnya otomatis.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      description: 'Gambar yang akan muncul di kartu halaman utama.',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
      description: 'Ringkasan singkat tentang paket ini. Akan berguna untuk SEO dan preview.',
    }),

    // --- Informasi untuk Tampilan Kartu ---
    defineField({
      name: 'isPopular',
      title: 'Tandai sebagai Populer',
      type: 'boolean',
      description: 'Aktifkan ini untuk menampilkan label "Popular" di kartu.',
      initialValue: false,
    }),
    defineField({
      name: 'tripType',
      title: 'Tipe Perjalanan',
      type: 'string',
      description: 'Pilih kategori atau target pasar utama untuk paket ini.',
      options: {
        list: [
          // Format: { title: 'Tampilan untuk Admin', value: 'Teks untuk Frontend@nama_ikon' }
          
          // --- Berdasarkan Grup ---
          { title: 'Keluarga (Family Friendly)', value: 'Family Friendly@family_restroom' },
          { title: 'Pasangan (Bulan Madu/Romantis)', value: 'Paket Romantis@favorite' },
          { title: 'Grup Kantor (Company Outing)', value: 'Company Outing@groups' },
          { title: 'Grup Teman (Friends Trip)', value: 'Trip bareng Teman@diversity_3' },
          { title: 'Perjalanan Sendiri (Solo Traveler)', value: 'Solo Traveler@person' },
          
          // --- Berdasarkan Aktivitas ---
          { title: 'Petualangan (Adventure)', value: 'Petualangan@hiking' },
          { title: 'Budaya & Sejarah', value: 'Wisata Budaya@museum' },
          { title: 'Kuliner', value: 'Wisata Kuliner@restaurant' },
          { title: 'Relaksasi & Spa', value: 'Relaksasi & Spa@spa' },
          { title: 'Tur Fotografi', value: 'Tur Fotografi@photo_camera' },

          // --- Berdasarkan Tujuan Khusus ---
          { title: 'Ziarah Keagamaan', value: 'Ziarah@mosque' },
          { title: 'Kunjungan Edukasi (Study Tour)', value: 'Study Tour@school' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'accommodationInfo',
      title: 'Informasi Akomodasi',
      type: 'string',
      description: 'Pilih jenis akomodasi utama atau status penginapan.',
      options: {
        list: [
          // Format: { title: 'Tampilan untuk Admin', value: 'Teks untuk Frontend@nama_ikon' }

          // --- Tipe Spesifik ---
          { title: 'Termasuk Hotel Bintang 3-5', value: 'Hotel Bintang 3-5@hotel_class' },
          { title: 'Termasuk Hotel Budget', value: 'Hotel Budget@hotel' },
          { title: 'Termasuk Villa Pribadi', value: 'Villa Pribadi@villa' },
          { title: 'Menginap di Homestay Lokal', value: 'Homestay Lokal@cottage' },
          { title: 'Glamping (Glamour Camping)', value: 'Glamping@camping' },
          { title: 'Liveaboard (Menginap di Kapal)', value: 'Liveaboard@sailing' },

          // --- Status Umum ---
          { title: 'Termasuk Akomodasi', value: 'Termasuk Akomodasi@bed' },
          { title: 'Akomodasi Fleksibel (Bisa Pilih)', value: 'Akomodasi Fleksibel@tune' },
          { title: 'Tanpa Menginap (One Day Trip)', value: 'One Day Trip@wb_sunny' },
          { title: 'Tanpa Akomodasi', value: 'Tanpa Akomodasi@no_meals' },
        ],
        layout: 'radio',
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'tripType',
      media: 'mainImage',
    },
  },
});