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
exports.CheckReporter = void 0;
const kubeval_1 = require("./kubeval");
class CheckReporter {
    constructor(octokit, context) {
        this.octokit = octokit;
        this.context = context;
    }
    create(kubevalResult) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let conclusion;
            if (kubevalResult.status === kubeval_1.KubevalResultStatus.SUCCESS) {
                conclusion = 'success';
            }
            else {
                conclusion = 'failure';
            }
            const result = yield this.octokit.checks.create({
                head_sha: (_b = (_a = this.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.head.sha) !== null && _b !== void 0 ? _b : this.context.sha,
                owner: this.context.repo.owner,
                repo: this.context.repo.repo,
                name: 'Kubeval',
                status: 'completed',
                conclusion: conclusion,
                output: {
                    title: 'Kubeval Report',
                    summary: kubevalResult.status == kubeval_1.KubevalResultStatus.SUCCESS
                        ? ':heavy_check_mark: All tests have passed'
                        : ':x: Some tests failed',
                    text: kubevalResult.output
                }
            });
            return Promise.resolve(result.data.details_url);
        });
    }
}
exports.CheckReporter = CheckReporter;
