import { FC, useEffect, useState, useRef } from "react";
import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";

export interface ILog extends ReactCodeMirrorProps {
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
      editable={false}
      theme="dark"
      {...rest}
    />
  );
};

export default Log;
