import { IConnectOptions, ILaunchOptions } from "miniprogram-automator/out/Launcher";
declare class Simulator {
    private constructor();
    static launch(options: ILaunchOptions): Promise<null>;
    static connect(options: IConnectOptions): Promise<import("miniprogram-automator/out/MiniProgram").default>;
}
export default Simulator;
