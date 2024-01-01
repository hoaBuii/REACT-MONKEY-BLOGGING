import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUpPage";
import SigninPage from "./pages/SigninPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./components/module/dashboard/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import PostAddNew from "./components/module/post/PostAddNew";
import CategoryAddNew from "./components/module/category/CategoryAddNew";
import CategoryManage from "./components/module/category/CategoryManage";
import CategoryUpdate from "./components/module/category/CategoryUpdate";
import UserManage from "./components/module/user/UserManage";
import UserAddNew from "./components/module/user/UserAddNew";
import UserUpdate from "./components/module/user/UserUpdate";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/update-category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route
              path="/manage/update-user"
              element={<UserUpdate></UserUpdate>}
            ></Route>
          </Route>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SigninPage></SigninPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
