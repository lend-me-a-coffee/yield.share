import { ChakraProvider} from '@chakra-ui/react';
import { Routes, Route} from "react-router-dom";
import CreateProfile from './views/Creator/CreateProfile';
import CreateStake from './views/User/CreateStake';
import Landing from './views/User/Landing';
import Loading from './views/User/Loading';
import RemoveStake from './views/User/RemoveStake';
import StakeSuccess from "./views/User/StakeSuccess"
import ProfileSuccess from './views/Creator/ProfileSuccess';
import DetailedView from "./views/User/DetailedView";
import NotFound from './views/User/NotFound';



function App() {
  return (
    <div>
      <ChakraProvider>           
            <Routes>
              {/* update params as needed */}
                <Route path="/" element={<Landing/>}/>
                <Route path="/detailView/:contractAddress" element={<DetailedView/>}/>
                <Route path="/createStake" element={<CreateStake/>}/>
                <Route path="/loading" element={<Loading/>}/>  
                <Route path="/stakeSuccess" element={<StakeSuccess/>} />    
                <Route path="/removeStake/:contractAddress/:tokenId" element={<RemoveStake/>}/>
                <Route path="/createProfile" element={<CreateProfile/>} />
                <Route path="/profileSuccess" element={<ProfileSuccess/>} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </ChakraProvider>
    </div>
  );
}

export default App;
