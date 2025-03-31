
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

import "./globals.css";

export const metadata = {
  title: "岗位分析",
  description: "分析公考岗位",
};

const layout = ({ children }) => {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
          <Footer />
        </div>

      </body>
      
    </html>
    
  );
};

export default layout;