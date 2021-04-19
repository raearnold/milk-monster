import './App.css';
import Calculator from './components/Calculator';
import Ads from './components/Ads';

function App() {
  return (
    <>
      <header>
        <img src="./milk-monster-logo.png" width="250" height="250" rel="logo" />
        <h1>
          Milk Monster 
          <small>A Calculator for Feeding Expressed Breastmilk</small>
        </h1>
      </header>

      <main>
        <p>We get it. It's not always possible for our little nipple pirahnas to feed at the breast. Whether you're back to work, are away for a few hours, or just need your body to yourself right now, a bottle of expressed breast milk will get your baby fed.</p>

        <h2>But how much expressed breast milk should be in the bottle?</h2>

        <Calculator />

        <p>This is just a guideline. Some babies might take more (especially in the middle of a growth spurt). Some might want less. But if you're like us, we really want a number to use as a starting place. <small><a href="#Methodology">How are we calculating this?</a></small></p>

        <section>
          <Ads />
        </section>

        {/* TODO: Make this an accordion */}
        <section id="Methodology">
          <h2>Methodology</h2>
          <p>Between 1 and 4 weeks, the generally accepted calculation is that a baby needs approximately 2.5oz of breastmilk per pound of weight. Before 1 week, you really should talk to an expert.</p>
          <p>After 4 weeks of age, most sources say a baby will eat 24-30 ounces a day. We assume that once a baby is older than 4 weeks and heavier than 12 pounds, they will eat a maximum of 30oz. and calculate accordingly.</p>
          <p>After 6 months of age, most children begin eating solids, which reduces their need for breastmilk. Please talk to an expert about what your baby needs.</p>
          <p>All calculations assume the baby being fed was born at term. Premature babies may have vastly different needs (or the calculations may only apply to adjusted age, not actual age).</p>
        </section>
      </main>
      <footer>
        <p>This is not medical advice. Please talk to your pediatrician or a certified lactation consultant if you have concerns about how much to feed your baby.</p>
        <p>Created with a bit of sleep-deprivation by <a href="http://raearnold.com">Rachael Arnold</a>. View code on <a href="https://github.com/raearnold/milk-monster">Github</a>.</p>
      </footer>
    </>
  );
}

export default App;
