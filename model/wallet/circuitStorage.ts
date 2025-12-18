import { CircuitData, CircuitId, IDataSource } from "@0xpolygonid/js-sdk";
import { fetch } from 'expo/fetch';

export interface ExpoDataSourceOptions {
  dirname: string;
  verificationFileName?: string;
  provingFileName?: string;
  wasmFileName?: string;
}

export class ExpoDataSource implements IDataSource<CircuitData> {
  private readonly _verificationKeyPath: string = 'verification_key.json';
  private readonly _provingKeyPath: string = 'circuit_final.zkey';
  private readonly _wasmFilePath: string = 'circuit.wasm';

  constructor(private readonly opts: ExpoDataSourceOptions) {
    this._verificationKeyPath = this.opts.verificationFileName ?? this._verificationKeyPath;
    this._provingKeyPath = this.opts.provingFileName ?? this._provingKeyPath;
    this._wasmFilePath = this.opts.wasmFileName ?? this._wasmFilePath;
  }

  load(): Promise<CircuitData[]> {
    throw new Error("Method not implemented.");
  }

  save(key: string, value: CircuitData, keyName?: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async get(key: string, keyName?: string): Promise<CircuitData | undefined> {
    const verificationKey = await this.loadCircuitFile(key, this._verificationKeyPath);
    const provingKey = await this.loadCircuitFile(key, this._provingKeyPath);
    const wasm = await this.loadCircuitFile(key, this._wasmFilePath);

    return {
      circuitId: key as CircuitId,
      verificationKey,
      provingKey,
      wasm
    }
  }

  delete(key: string, keyName?: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private async loadCircuitFile(
    circuitId: string,
    filename: string
  ): Promise<Uint8Array | null> {
    const keyPath = `${this.opts.dirname}/${circuitId}/${filename}`;

    const response = await fetch(keyPath);
    if (response.ok) {
      const file = await response.arrayBuffer();
      return new Uint8Array(file);
    } else {
      throw new Error(`File not found: ${keyPath}`);
    }
  }
}