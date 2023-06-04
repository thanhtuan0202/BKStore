import { combineReducers } from "redux";
import danhSachDonHangReducer from "../../containers/HomeTemplate/DanhSachDonHang/modules/reducer";
import detailDonHangReducer from "../../containers/HomeTemplate/DetailDonHang/modules/reducer";
import loginAdmin from "../../containers/HomeTemplate/LoginAdmin/loginAdmin";
const rootReducer = combineReducers({
    danhSachDonHangReducer,
    detailDonHangReducer,
    loginAdmin: loginAdmin
})

export default rootReducer;