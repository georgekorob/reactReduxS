import React from "react";
import {create} from "react-test-renderer";
import Paginator from "./Paginator";

describe("Paginator component", () => {
    test("if pages count is more then 10 but should be present", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1}/>);
        const links = component.root.findAllByType('a');
        expect(links.length).toBe(1);
    });
    test("pages count is 11 but should be showed only 10", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1}/>);
        const links = component.root.findAllByType('span');
        expect(links.length).toBe(10);
    });
});
