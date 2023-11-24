import CreateAccount from "./pages/CreateAccount";
import EditDiary from "./pages/EditDiary";
import HomePage from "./pages/HomePage";
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
        path: '/createAccount',
        element: CreateAccount,

    },
    {
        path: '/:id/edit',
        element: EditDiary,
    }
];

export default paths;