
import startAllIdeas from './js/idejos';
import startHomeIdea from './js/ideja';
import Calendar from './js/calendar';
import Album from './js/album';
import Events from './js/events';
import ImageUploade from './js/uploade_image';
import LightBox from './js/lightBox';
import FrontMenu from './js/frontmenu';
import Pagination from './js/pagination';
import Home from './js/home'


new Calendar('.calendar');
new Album('.inner');
new FrontMenu('.navMenu');
new Events('.eventsHome');
new ImageUploade("loadeGallery");
new LightBox("showGallery");
new Home(".mainImage");



