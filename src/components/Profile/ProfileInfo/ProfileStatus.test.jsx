import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    const status = "it-kama";
    test("status from props should be in state", () => {
        const component = create(<ProfileStatus status={status}/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe(status);
    });
    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status={status}/>);
        const span = component.root.findByType('span');
        expect(span).not.toBeNull();
    });
    test("after creation <input> should not be displayed", () => {
        const component = create(<ProfileStatus status={status}/>);
        const root = component.root;
        expect(()=>root.findByType('input')).toThrow();
    });
    test("after creation <span> should be contains correct status", () => {
        const component = create(<ProfileStatus status={status}/>);
        const span = component.root.findByType('span');
        expect(span.children[0]).toBe(status);
    });
    test("<input> should be displayed after doubleClick instead of span", () => {
        const component = create(<ProfileStatus status={status}/>);
        const span = component.root.findByType('span');
        span.props.onDoubleClick();
        const input = component.root.findByType('input');
        expect(input.props.value).toBe(status);
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status={status} updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deActivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});