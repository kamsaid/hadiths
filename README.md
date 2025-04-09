# Islamic Hadiths Collection

A beautiful web application showcasing a collection of authentic hadiths from Sahih Bukhari and Sahih Muslim with Arabic text, English translations, and explanations.

## Features

- Responsive design that works on desktop, tablet, and mobile devices
- Beautiful UI with TailwindCSS
- Collection of 10 authentic hadiths with:
  - Original Arabic text
  - English translation
  - Detailed explanation
  - Beautiful themed placeholder images
- Individual hadith pages with full details
- Navigation between hadiths
- About section with information on hadith collections

## Technologies Used

- Next.js 14 (React framework)
- TailwindCSS (Styling)
- React Hooks
- App Router

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/islamic-hadiths-collection.git
cd islamic-hadiths-collection
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/app` - Main application code (Next.js App Router)
  - `/components` - Reusable React components
  - `/data` - Hadith data and image mappings
  - `/hadith/[id]` - Dynamic routes for individual hadith pages
- `/public` - Static assets

## Future Enhancements

- Add more hadiths to the collection
- Implement search functionality
- Add categories/topics for hadiths
- Include audio recitations
- Add bookmarking functionality

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Sahih Bukhari and Sahih Muslim for the authentic hadith collections
- Next.js team for the excellent framework
- TailwindCSS team for the utility-first CSS framework 