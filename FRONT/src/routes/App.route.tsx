import { Routes , Route , Navigate } from 'react-router-dom';
import { mainProvider as SP } from '../context/main.context';
import SpectatorContent from './views/page';
import GalleryView from './views/gallery/galleryView';
import { authProvider as AP } from '../context/admin.context';
import MainAdmin from '../pages/admin/main';

export const AppRouter = () => {

    return(
        <Routes>
            <Route path=''          element={ <SP><SpectatorContent/></SP> }/>
            <Route path='*'         element={ <Navigate to=''/> }/>
            <Route path='gallery'   element={ <SP><GalleryView/></SP> }/>
            <Route path='admin'     element={ <AP><MainAdmin/></AP> }/>
        </Routes>
    )

}