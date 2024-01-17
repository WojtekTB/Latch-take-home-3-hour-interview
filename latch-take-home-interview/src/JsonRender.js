import React, { useState, useEffect } from "react";

const Paragraph = ({ title, children }) => (
  <div title={title}>
    {children.map((child, index) => {
      if (!child) {
        return;
      }
      if (child.bold) {
        return <strong key={index}>{child.text}</strong>;
      } else if (child.type === "mention") {
        return (
          <Mention
            key={index}
            color={child.color}
            children={child.children}
          ></Mention>
        );
      }
      if (child.text) {
        const newLines = child.text.split(/(\n)/);
        if (newLines.length > 1) {
          return (
            <>
              {newLines.map((newLineChild, j) => {
                if (newLineChild === "\n") {
                  return <div></div>;
                }
                return <span key={`${index}-${j}`}>{newLineChild}</span>;
              })}
            </>
          );
        } else {
          return <span key={index}>{child.text}</span>;
        }
      }
      return null;
    })}
  </div>
);

const Mention = ({ color, children }) => {
  const mentionStyle = {
    backgroundColor: color,
    padding: "2px 8px",
    borderRadius: "4px",
    color: "white",
    display: "inline-block",
  };

  return <span style={mentionStyle}>{children[0].text}</span>;
};

const Clause = ({ title, children }) => {
  const [componentIndex, setComponentIndex] = useState(1);

  useEffect(() => {
    // const parentDiv = need to get closest div and use as key
    // const componentsInParent = parentDiv
    //   ? parentDiv.getElementsByClassName("numbered-component")
    //   : [];
    // const currentIndex = Array.from(componentsInParent).indexOf(
    //   document.getElementById("currentComponent")
    // );
    // setComponentIndex(currentIndex + 1);
  }, []);

  return (
    <div>
      {/* <p>This is component {componentIndex}</p> */}
      {children.map((child, index) => renderNode(child, index))}
    </div>
  );
};

const renderNode = (node, index) => {
  if (node == null) {
    return;
  }
  switch (node.type) {
    case "block":
      return (
        <div key={index}>
          {node.children &&
            node.children.map((child, i) => renderNode(child, i))}
        </div>
      );

    case "h1":
      return (
        <div key={index}>
          <h1>{node.children && node.children[0].text}</h1>
        </div>
      );

    case "p":
      return (
        <Paragraph key={index} title={node.title} children={node.children} />
      );

    case "h4":
      return (
        <div key={index}>
          {/* <h4>{node.children && node.children[0].text}</h4> */}
          <Paragraph key={index} title={node.title} children={node.children} />
        </div>
      );

    case "mention":
      return (
        <Mention key={index} color={node.color} children={node.children} />
      );

    case "clause":
      return (
        <Clause
          key={index}
          title={node.title}
          children={node.children && node.children}
        />
      );

    case "ul":
      return (
        <ul key={index}>
          {node.children &&
            node.children.map((child, i) => renderNode(child, i))}
        </ul>
      );

    case "li":
      return (
        <li key={index}>
          <Paragraph title={node.title} children={node.children} />
        </li>
      );

    default:
      return null;
  }
};

const JsonRenderer = ({ json }) => {
  return json.map((node, index) => renderNode(node, index));
};

export default JsonRenderer;
