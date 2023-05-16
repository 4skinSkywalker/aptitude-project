import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { groups } from './data/groups';
import { HierarchyComponent } from './hierarchy.component';
import { LevelComponent } from './level.component';
import { HtmlDecodePipe } from '../../../shared/pipes/html-decode.pipe';

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

    const childUrl = childItem.title.escaped;

    const isParentRoot = parentRoute.path === "";

    const childRoute: Route = {
        path: `${parentRoute.path}${!isParentRoot ? "/" : ""}${childUrl}`,
        component: HierarchyComponent,
        data: {
            mongoPath: parentRoute.data!.mongoPath + childItem.title.original + ",",
            children: []
        }
    };

    routes.push(childRoute);

    parentRoute.data!.children.push({
        path: childUrl,
        title: childItem.title,
        questions: childItem.questions
    });

    return childRoute;
};

function recur(children: any, parentRoute: Route, leafCb: Function) {
    for (const child of children) {

        const childRoute = compileParent(parentRoute, child);

        let hasChildren = false;

        for (const key in child) {
            const val = child[key];
            if (Array.isArray(val)) {
                hasChildren = true;
                recur(val, childRoute, leafCb);
            }
        }

        if (!hasChildren) {
            leafCb(childRoute);
        }
    }
}

console.time("Creating routes");
recur(groups, rootRoute, (leaf: any) => {
    leaf.component = LevelComponent,
    leaf.data = { ...leaf.data, leaf: true }; 
});
console.timeEnd("Creating routes");

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PracticeModule { }
