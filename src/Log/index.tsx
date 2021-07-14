import { FC, useEffect, useState, useRef } from "react";
import CodeMirror, { IReactCodemirror } from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";

export interface ILog extends IReactCodemirror {
  polling?: number;
  request?: (params?: any) => Promise<any>;
}

export type Timer = NodeJS.Timeout | null;

const Log: FC<ILog> = ({ polling, request, ...rest }) => {
  const timer = useRef<Timer>(null);

  const [value, setValue] = useState();

  const setter = async () => {
    if (!request) return;
    const { data } = await request();
    setValue(data);
  };

  useEffect(() => {
    setter();
  }, []);

  useEffect(() => {
    if (!polling) return;
    timer.current = setInterval(setter, polling);
    return () => {
      timer.current && clearInterval(timer.current);
      timer.current = null;
    };
  }, [polling, request]);

  return (
    <CodeMirror
      value={value}
      options={{
        theme: "monokai",
        keyMap: "sublime",
        readOnly: true,
      }}
      {...rest}
    />
  );
};

export default Log;
