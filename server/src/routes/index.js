import AuthRoute from './auth.js'
import UserRoute from './user.js';
import ImagesRoute from './images.js';
import DeleteImagesRoute from './deletedImages.js';
import AlbumRoute from './album.js';
import AlbumImagesRoute from './albumImages.js';
import HistoryUpgradeRoute from './historyUpgrade.js'
import CapacityPackageRoute from './capacityPackage.js';
import IdentifyRoute from './identify.js';

function routes(app) {
    // refactor
    app.use('/auth', new AuthRoute().getRouter());
    app.use('/user', new UserRoute().getRouter());
    app.use('/images', new ImagesRoute().getRouter());
    app.use('/deleted/images',  new DeleteImagesRoute().getRouter());
    app.use('/album', new AlbumRoute().getRouter());
    app.use('/album/images',  new AlbumImagesRoute().getRouter());
    app.use('/history', new HistoryUpgradeRoute().getRouter());
    app.use('/package/capacity', new CapacityPackageRoute().getRouter());
    app.use('/identify', new IdentifyRoute().getRouter());
}

export default routes;

