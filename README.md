# Heat Pump Noise Assessment Calculator

A professional web application for calculating and assessing heat pump noise levels according to MCS 020 standards. Built with React, TypeScript, and Tailwind CSS.

![Heat Pump Calculator Screenshot](https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop)

## Features

- 📊 Real-time noise level calculations
- 🎯 Compliance assessment against MCS 020 standards
- 📱 Responsive design for all devices
- 📄 PDF report generation
- 💾 Assessment history storage
- 🎨 Modern, user-friendly interface

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Supabase (Database)
- React-PDF for report generation
- Lucide React for icons

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/         # React components
│   ├── Calculator/    # Calculator-specific components
│   └── ui/           # Reusable UI components
├── data/             # Static data and configurations
├── hooks/            # Custom React hooks
├── lib/              # Library configurations
├── utils/            # Utility functions
└── types/            # TypeScript type definitions
```

## Features in Detail

### Noise Level Calculator
- Input heat pump specifications
- Calculate distance reductions
- Account for barriers and reflective surfaces
- Real-time compliance checking

### Report Generation
- Generate detailed PDF reports
- Include client information
- Professional formatting
- Immediate download

### Database Integration
- Store assessment results
- Technical specifications only
- No personal data storage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- MCS 020 Standards for noise assessment guidelines
- React and Vite communities for excellent documentation
- Tailwind CSS for the styling framework
- Supabase for the backend infrastructure