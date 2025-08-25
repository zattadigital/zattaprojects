export const metadata = {
  title: 'Diogo - Full Stack Developer',
  description: 'Portfólio profissional de Diogo, desenvolvedor Full Stack com mais de 7 anos de experiência',
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/assets/css/fonts/fontawesome.css" />
        <link rel="stylesheet" href="/assets/css/plugins/swiper.css" />
        <link rel="stylesheet" href="/assets/css/plugins/odometer.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}