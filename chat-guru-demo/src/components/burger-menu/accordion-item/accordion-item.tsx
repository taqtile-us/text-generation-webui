import React, {FC} from 'react';
import {DirectoryTree} from "../../../shared/types";

const AccordionItem: FC<Pick<DirectoryTree, 'name' | 'children'>> = ({name, children}) => {
    return (
        <div>
          <div>{name}</div>
            {children && <AccordionItem  name={name} children={children}/>}
        </div>
    );
};

export default AccordionItem;