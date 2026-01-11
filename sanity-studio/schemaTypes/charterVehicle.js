import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'charterVehicle',
  title: 'Armada Charter',
  type: 'document',
  fields: [
    defineField({
      name: 'vehicleName',
      title: 'Nama Kendaraan',
      type: 'string',
      description: 'Contoh: "Toyota HiAce Commuter" atau "Luxury Alphard"',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Unik)',
      type: 'slug',
      description: 'Dibutuhkan untuk link ke halaman detail nanti. Klik "Generate" untuk membuatnya otomatis.',
      options: {
        source: 'vehicleName',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama Kendaraan',
      type: 'image',
      description: 'Foto terbaik dari kendaraan yang akan ditampilkan di kartu.',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isPopular',
      title: 'Tandai sebagai Populer',
      type: 'boolean',
      description: 'Aktifkan ini jika armada ini adalah yang paling sering dipesan atau sedang dipromosikan.',
      initialValue: false,
    }),
    defineField({
      name: 'shortDescription',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
      description: 'Ringkasan singkat tentang kendaraan ini, misal target penggunaannya (grup besar, keluarga, VIP).',
    }),
    defineField({
      name: 'features',
      title: 'Fasilitas & Keunggulan Utama',
      type: 'array',
      description: 'Tambahkan poin-poin keunggulan utama dari kendaraan ini. Ini akan ditampilkan di kartu.',
      of: [{
        type: 'object',
        name: 'featurePoint',
        title: 'Poin Fasilitas',
        fields: [
          defineField({
            name: 'icon',
            title: 'Pilih Ikon',
            type: 'string',
            description: 'Pilih ikon yang paling mewakili fasilitas ini.',
            options: {
              list: [
                // --- Kapasitas & Ruang ---
                { title: 'Kapasitas Kursi', value: 'groups' },
                { title: 'Kursi Nyaman/Lega', value: 'airline_seat_recline_normal' },
                { title: 'Bagasi Luas', value: 'luggage' },

                // --- Hiburan & Kenyamanan ---
                { title: 'AC / Pendingin Udara', value: 'ac_unit' },
                { title: 'Sistem Audio', value: 'speaker_group' },
                { title: 'Karaoke', value: 'mic' },
                { title: 'TV / Layar Hiburan', value: 'tv' },
                { title: 'Port USB Charger', value: 'usb' },
                { title: 'Wi-Fi', value: 'wifi' },
                
                // --- Keamanan & Performa ---
                { title: 'Keamanan (Airbag, dll.)', value: 'health_and_safety' },
                { title: 'Performa Mesin', value: 'speed' },
                { title: 'Irit BBM', value: 'local_gas_station' },

                // --- Kualitas & Layanan ---
                { title: 'Interior Mewah / VIP', value: 'diamond' },
                { title: 'Kendaraan Baru / Terawat', value: 'new_releases' },
                { title: 'Driver Profesional', value: 'person_pin' }, // Ikon orang dengan pin lokasi
                { title: 'Cocok untuk Keluarga', value: 'family_restroom' },
              ],
              layout: 'radio',
            },
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'text',
            title: 'Teks Fasilitas',
            type: 'string',
            description: 'Contoh: "Kapasitas hingga 14 orang" atau "Sistem Audio Premium"',
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
      title: 'vehicleName',
      media: 'mainImage',
    },
  },
});
