"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const kubeval_1 = require("./kubeval");
const reporter_1 = require("./reporter");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const octokit = github.getOctokit(core.getInput('github_token', { required: true }));
            const kubeval = new kubeval_1.KubevalRunner();
            const reporter = new reporter_1.CheckReporter(octokit, github.context);
            const result = yield kubeval.run({
                files: core.getInput('files') || '.',
                k8sVersion: core.getInput('k8s_version') || 'master',
                strict: Boolean(core.getInput('strict')),
                ignoreMissingSchemas: Boolean(core.getInput('ignore_missing_schemas')),
                additionalSchemas: core.getInput('additional_schemas') || ''
            });
            core.info('Generaintg report');
            const reportUrl = yield reporter.create(result);
            if (result.status === kubeval_1.KubevalResultStatus.FAIL) {
                core.setFailed(`Kubeval Failed with errors. See results: ${reportUrl}`);
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
