import Header from './Header';
import TinderCards from './TinderCards';
import SwipeButtons from './SwipeButtons';
import { useParams } from 'react-router-dom';


function Home() {
  const {email}=useParams();
  console.log(email);
  return (
    <div className="App">
       <Header email={email}/>
       <TinderCards/>
       <SwipeButtons/>
    </div>
  );
}

export default Home;

// clinetId = 1025198237355-ppv8l3tei7obopkkstognqmdstsam3ft.apps.googleusercontent.com