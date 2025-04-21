import Layout from "./components/Layout";
import Banner from "./components/Banner";
import HeaderCTA from "./components/HeaderCTA";
import MissionValues from "./components/MissionValues";
import Founders from "./components/Founders";
import Team from "./components/Team";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <Layout>
      <Banner />
      <HeaderCTA />
      <MissionValues />
      <Founders />
      <Team />
      <CTA />
      <Footer />
    </Layout>
  );
}

export default App;
