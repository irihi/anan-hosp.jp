// styles
import "sanitize.css";
import "./styles/index.scss";

import './scripts/AnchorList';
import './scripts/ScrollToHash';
import { createAnanHospitalHeaderScroll } from './scripts/Header';

const cleanup = createAnanHospitalHeaderScroll(30);