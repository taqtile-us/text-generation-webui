import React from 'react';
import {observer} from "mobx-react-lite";
import {chatStore} from "../../stores/chat-store";
import AccordionItem from "./accordion-item/accordion-item";

const BurgerMenu = observer(() => {
    const {projectsTree} = chatStore

    return (
        <div>
            <AccordionItem name={projectsTree.name} children={projectsTree.children}/>
        </div>
    );
});

export default BurgerMenu;