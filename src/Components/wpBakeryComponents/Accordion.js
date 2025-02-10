import React from "react";
import { Accordion } from "react-bootstrap";

const AccordionComponent = ({ item, renderContent }) => (
  <Accordion defaultActiveKey="0">
    {item.content.map((section, index) => (
      <Accordion.Item eventKey={index.toString()} key={index}>
        <Accordion.Header>{section.attributes.title}</Accordion.Header>
        <Accordion.Body>
          {section.content.map((child, i) => (
            <React.Fragment key={i}>{renderContent(child)}</React.Fragment>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    ))}
  </Accordion>
);

export default AccordionComponent;
