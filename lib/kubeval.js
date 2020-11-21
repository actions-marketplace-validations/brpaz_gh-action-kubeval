"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KubevalRunner = exports.KubevalResultStatus = void 0;
const exec_1 = require("@actions/exec");
var KubevalResultStatus;
(function (KubevalResultStatus) {
    KubevalResultStatus[KubevalResultStatus["SUCCESS"] = 1] = "SUCCESS";
    KubevalResultStatus[KubevalResultStatus["FAIL"] = 2] = "FAIL";
})(KubevalResultStatus = exports.KubevalResultStatus || (exports.KubevalResultStatus = {}));
class KubevalRunner {
    // runs Kubeval and creates checks based on result.
    run(cmdArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = '';
            const args = ['--kubernetes-version', `${cmdArgs.k8sVersion}`, '-d', `${cmdArgs.files}`];
            if (cmdArgs.strict) {
                args.push('--strict');
            }
            if (cmdArgs.ignoreMissingSchemas) {
                args.push('--ignore-missing-schemas');
            }
            let status = KubevalResultStatus.SUCCESS;
            try {
                yield exec_1.exec('kubeval', args, {
                    listeners: {
                        stdout: (data) => {
                            output += data.toString();
                        }
                    }
                });
            }
            catch (error) {
                status = KubevalResultStatus.FAIL;
            }
            return {
                status,
                output
            };
        });
    }
}
exports.KubevalRunner = KubevalRunner;
