import LoadingSpinner from "./components/LoadingSpinner";
import EditDiary from "./pages/EditDiary";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import MyDiaries from "./pages/MyDiaries";
import WriteDiary from "./pages/WriteDiary";

const paths = [
    {
        path: '/',
        element: HomePage,
    },
    {
        path: '/write',
        element: WriteDiary,
    },
    {
        path: '/mydiaries',
        element: MyDiaries,

    },
    {
        path: '/login',
        element: Login,

    },
    {
        path: '/:id/edit',
        element: EditDiary,
    }
];

export default paths;