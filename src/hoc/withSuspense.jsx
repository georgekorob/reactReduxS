// import React, {lazy, Suspense} from "react";
//
// import {withSuspense} from "./hoc/withSuspense";
// const UsersContainer = lazy(() => import("./components/Users/UsersContainer"));
// const DialogsContainer = lazy(() => import("./components/Dialogs/DialogsContainer"));
// const ProfileContainer = lazy(() => import("./components/Profile/ProfileContainer"));
// {/*<Suspense fallback={<div>loading...</div>}>*/}
// {/*</Suspense>*/}
//
// export const withSuspense = Component => props => {
//     return <React.Suspense fallback={<div>loading...</div>}>
//         {/*{() => <div>Loaded!</div>}*/}
//         <Component {...props}/>
//     </React.Suspense>
// }