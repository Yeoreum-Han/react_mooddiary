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

    }
];

export default paths;