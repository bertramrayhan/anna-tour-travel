import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'videoGallery',
  
  title: 'Galeri Video',
  
  type: 'document',
  
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Video',
      type: 'string',
      description: 'Contoh: "Keseruan Trip ke Bromo" atau "Menyelami Keindahan Raja Ampat". Judul ini akan ditampilkan di website.',
      validation: Rule => Rule.required().error('Judul video tidak boleh kosong.'),
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL Video YouTube',
      type: 'url',
      description: 'Salin dan tempel URL lengkap dari video di YouTube. Contoh: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      validation: Rule => Rule.required( ).uri({
        scheme: ['http', 'https'],
        allowRelative: false,
      } ).error('Harap masukkan URL YouTube yang valid.'),
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat (Opsional)',
      type: 'text',
      rows: 3,
      description: 'Penjelasan singkat tentang apa yang ada di dalam video ini. Bisa ditampilkan di masa depan jika perlu.',
    }),
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'videoUrl',
    },
  },
});