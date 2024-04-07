import Details from './Components/Details';
import Header from './Components/Header';
import MainManage from './Components/MainManage';
import MainMap from './Components/Map';
import './index.scss';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <div className='mainPage'>
        <aside>
          <MainManage />
        </aside>
        <main>
          <MainMap />
          <Details />
        </main>
      </div>
    </>
  );
}

export default App;
