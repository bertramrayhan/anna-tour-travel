import { defineType, defineField } from 'sanity';

/**
 * Skema ini mendefinisikan semua konten yang dapat diedit untuk Halaman Utama.
 * Didesain sebagai "single-document" agar hanya ada satu entri untuk seluruh situs.
 */
export default defineType({
  name: 'halamanUtama',
  title: 'Pengaturan Halaman Utama',
  type: 'document',

  // Menggunakan fieldsets untuk mengelompokkan field, sama seperti cara Anda.
  fieldsets: [
    { name: 'hero', title: 'Hero Section (Bagian Paling Atas)' },
    { name: 'kontak', title: 'Informasi Kontak & Sosial Media' },
    { name: 'whyUs', title: 'Seksi "Kenapa Memilih Kami"' },
  ],

  // Baris ini (opsional) berguna untuk mencegah pengguna membuat dokumen kedua dari tipe ini.
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],

  fields: [
    // Field internal, tidak perlu fieldset
    defineField({
      name: 'title',
      title: 'Judul Internal',
      type: 'string',
      initialValue: 'Pengaturan Halaman Utama',
      hidden: true,
    }),

    // --- Hero Section ---
    defineField({
      name: 'hero_headline',
      title: 'Judul Utama',
      type: 'string',
      description: 'Teks besar yang paling pertama dilihat pengunjung. Contoh: "Temani Perjalanan Wisata Anda..."',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'hero_subheadline',
      title: 'Sub-Judul / Deskripsi',
      type: 'text',
      rows: 3,
      description: 'Teks penjelasan di bawah judul utama.',
      fieldset: 'hero',
    }),
    defineField({
      name: 'hero_backgroundImage',
      title: 'Gambar Latar Belakang',
      type: 'image',
      options: { hotspot: true },
      description: 'Gambar pemandangan untuk latar belakang.',
      fieldset: 'hero',
      validation: Rule => Rule.required(),
    }),

    // --- Kontak & Sosial Media ---
    defineField({
      name: 'nomor_telepon',
      title: 'Nomor Telepon (WhatsApp)',
      type: 'string',
      description: 'Gunakan format internasional tanpa spasi/simbol, contoh: 6281234567890',
      fieldset: 'kontak',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'kontak_email',
      title: 'Alamat Email Kontak',
      type: 'string',
      fieldset: 'kontak',
    }),
    defineField({
      name: 'kontak_alamatPusat',
      title: 'Alamat Kantor Pusat',
      type: 'text',
      rows: 3,
      description: 'Alamat utama perusahaan.',
      fieldset: 'kontak',
      validation: Rule => Rule.required(), // Kantor pusat wajib ada
    }),
    defineField({
      name: 'kontak_alamatCabang',
      title: 'Alamat Kantor Cabang',
      type: 'array',
      description: 'Klik "Add item" untuk menambah alamat kantor cabang baru. Bisa dikosongkan jika tidak ada.',
      fieldset: 'kontak',
      of: [{
        type: 'text',
        name: 'alamatCabang',
        title: 'Alamat Cabang',
        rows: 3,
      }]
    }),
    defineField({
      name: 'kontak_socialLinks',
      title: 'Link Media Sosial',
      type: 'array',
      description: 'Tambahkan link ke akun media sosial perusahaan.',
      fieldset: 'kontak',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: { list: ['Instagram', 'Facebook', 'YouTube', 'TikTok', 'Twitter'] },
          }),
          defineField({
            name: 'url',
            title: 'URL Lengkap',
            type: 'url',
            validation: Rule => Rule.uri({ scheme: ['http', 'https'] } ),
          }),
        ],
        preview: { select: { title: 'platform', subtitle: 'url' } }
      }],
    }),
    defineField({
      name: 'whatsappTemplate',
      title: 'Template Pesan WhatsApp',
      type: 'text',
      rows: 20,
      description: `Atur template pesan WhatsApp di sini.

      Gunakan kode khusus {{NAMA_PRODUK}} untuk menyisipkan nama layanan secara otomatis.

      Contoh Penggunaan:
      Jika Anda menulis: "Halo, saya tertarik dengan {{NAMA_PRODUK}}."
      Hasilnya akan menjadi: "Halo, saya tertarik dengan Petualangan Bromo."`,
      fieldset: 'kontak',
      initialValue: `Halo, saya tertarik dengan layanan: {{NAMA_PRODUK}}

    Mohon informasinya. Terima kasih.`
    }),

    // --- Seksi "Kenapa Memilih Kami" ---
    defineField({
      name: 'whyUs_keunggulan',
      title: 'Poin Keunggulan',
      type: 'array',
      description: 'Harus diisi dengan tepat 3 poin keunggulan.',
      fieldset: 'whyUs',
      of: [{
        type: 'object',
        name: 'poinKeunggulan',
        title: 'Poin Keunggulan',
        fields: [
          defineField({
            name: 'icon',
            title: 'Pilih Ikon',
            type: 'string',
            options: {
              list: [
                { title: 'Hati (Pelayanan)', value: 'favorite' },
                { title: 'Bintang Terverifikasi (Kualitas)', value: 'verified' },
                { title: 'Mobil (Armada)', value: 'directions_car' },
                { title: 'Perisai (Keamanan)', value: 'shield' },
                { title: 'Jempol (Kepuasan)', value: 'thumb_up' },
                { title: 'Label Harga (Harga Kompetitif)', value: 'sell' },
                { title: 'Dompet (Hemat Biaya)', value: 'account_balance_wallet' },
                { title: 'Grup Orang (Spesialis Grup)', value: 'groups' },
                { title: 'Kamera (Spot Foto)', value: 'photo_camera' },
                { title: 'Makanan (Rekomendasi Kuliner)', value: 'restaurant' },
              ],
              layout: 'radio',
            },
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'title',
            title: 'Judul Keunggulan',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'description',
            title: 'Deskripsi Singkat',
            type: 'text',
            rows: 2,
          }),
        ],
        preview: { select: { title: 'title', media: 'icon' } }
      }],
    }),
  ],
});