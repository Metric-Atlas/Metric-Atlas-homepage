import { CommunityActions } from "./components/CommunityActions";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Quickstart } from "./components/Quickstart";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Quickstart />
        <CommunityActions />
      </main>
      <Footer />
    </>
  );
}

export default App;
