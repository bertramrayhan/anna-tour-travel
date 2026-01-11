// studio/schemas/regularTravel.js

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'regularTravel',
  title: 'Travel Reguler (Antar Kota)',
  type: 'document',
  icon: () => '↔️', // Emoji untuk ikon di menu studio

  fields: [
    defineField({
      name: 'routeName',
      title: 'Nama Rute Perjalanan',
      type: 'string',
      description: 'Contoh: "Jember ⇌ Surabaya (PP)" atau "Surabaya → Malang"',
      validation: Rule => Rule.required().error('Nama rute tidak boleh kosong.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Unik)',
      type: 'slug',
      options: {
        source: 'routeName',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      description: 'Foto yang mewakili rute ini (misal: ikon kota, atau foto armada yang biasa digunakan).',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isPopular',
      title: 'Tandai sebagai Rute Populer',
      type: 'boolean',
      description: 'Aktifkan ini jika rute ini adalah yang paling sering dipesan.',
      initialValue: false,
    }),
    defineField({
      name: 'shortDescription',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
      description: 'Ringkasan singkat tentang layanan di rute ini (misal: "Berangkat setiap hari, layanan door-to-door, via tol").',
    }),
    defineField({
      name: 'features',
      title: 'Fasilitas & Info Penting',
      type: 'array',
      description: 'Tambahkan poin-poin penting tentang rute ini.',
      of: [{
        type: 'object',
        name: 'featurePoint',
        fields: [
          defineField({
            name: 'icon',
            title: 'Pilih Ikon',
            type: 'string',
            options: {
              list: [
                // --- Info Jadwal & Rute ---
                { title: 'Jadwal (Jam)', value: 'schedule' },
                { title: 'Kalender (Hari)', value: 'calendar_month' },
                { title: 'Rute', value: 'route' },
                { title: 'Pintu (Door-to-Door)', value: 'door_front' },
                { title: 'Jalan Tol', value: 'add_road' },
                { title: 'Lokasi Jemput', value: 'pin_drop' },
                
                // --- Info Harga & Tiket ---
                { title: 'Orang (Harga per Kursi)', value: 'person' },
                { title: 'Grup (Diskon Rombongan)', value: 'groups' },
                { title: 'Tag Harga', value: 'sell' },
                { title: 'Dompet (Harga Terjangkau)', value: 'account_balance_wallet' },

                // --- Info Armada & Fasilitas ---
                { title: 'Mobil (Jenis Armada)', value: 'directions_car' },
                { title: 'Bus', value: 'directions_bus' },
                { title: 'AC / Pendingin Udara', value: 'ac_unit' },
                { title: 'Bagasi', value: 'luggage' },
                { title: 'Kursi Nyaman', value: 'airline_seat_recline_normal' },
                { title: 'Musik / Audio', value: 'speaker' },
                { title: 'Port USB', value: 'usb' },
                { title: 'Air Minum', value: 'local_drink' },

                // --- Lainnya ---
                { title: 'Info', value: 'info' },
                { title: 'Bintang (Rating)', value: 'star' },
              ],
              layout: 'radio',
            },
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'text',
            title: 'Teks Info',
            type: 'string',
            description: 'Contoh: "Berangkat setiap 2 jam" atau "Harga Rp 150.000 / orang"',
            validation: Rule => Rule.required(),
          }),
        ],
        preview: {
          select: {
            title: 'text',
            media: 'icon',
          },
        }
      }],
    }),
  ],
  preview: {
    select: {
      title: 'routeName',
      subtitle: 'shortDescription',
      media: 'mainImage',
    },
  },
});