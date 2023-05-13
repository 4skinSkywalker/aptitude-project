import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { groups } from './mocks/groups';
import { HierarchyComponent } from './hierarchy.component';

const title2url = (title: string) => encodeURI(title.replaceAll(" ", "-").toLowerCase());

const rootRoute = {
    path: "",
    component: HierarchyComponent,
    data: {
        mongoPath: ",Aptitude,",
        children: []
    }
};

export const routes: Routes = [
    rootRoute
];

const compileParent = (parentRoute: Route, childItem: any) => {

    const childUrl = title2url(childItem.title);

    const isParentRoot = parentRoute.path === "";

    const childRoute: Route = {
        path: `${parentRoute.path}${!isParentRoot ? "/" : ""}${childUrl}`,
        component: HierarchyComponent,
        data: {
            mongoPath: parentRoute.data!.mongoPath + childItem.title + ",",
            children: []
        }
    };

    routes.push(childRoute);

    parentRoute.data!.children.push({
        path: childUrl,
        title: childItem.title
    });

    return childRoute;
};

function recur(children: any, parentRoute: any, leafCb: Function) {

    if (!children) {
        return leafCb(parentRoute);
    }

    for (const child of children) {
        const childRoute = compileParent(parentRoute, child);
        recur(child.children, childRoute, leafCb);
    }
}

console.time("Creating routes");
recur(groups, rootRoute, (leaf: any) => {
    leaf.component = HierarchyComponent,
    leaf.data = { ...leaf.data, leaf: true }; 
});
console.timeEnd("Creating routes");

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PracticeModule { }
