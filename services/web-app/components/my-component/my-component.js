import { Button } from "@carbon/react";
import styles from "./my-component.module.scss";

const MyComponent = () => {
  return (
    <div className={styles.fooBar}>
      <div>My component</div>
      <Button>My button</Button>
    </div>
  );
};

export default MyComponent;
