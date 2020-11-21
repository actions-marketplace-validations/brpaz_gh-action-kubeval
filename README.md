# GitHub Action For Kubeval

> GitHub Action than runs [Kubeval](https://github.com/instrumenta/kubeval) and post the results as GitHub Check.

[![GitHub Action](https://img.shields.io/badge/GitHub-Action-blue?style=for-the-badge)](https://github.com/features/actions)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge)](https://github.com/semantic-release/semantic-release?style=for-the-badge)

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/brpaz/gh-action-kubeval/CI?style=for-the-badge)](https://github.com/brpaz/gh-action-kubeval/actions)

## Usage

```yaml
 - name: Kubeval
   uses: "brpaz/gh-kubeval-action@master"
   with:
    files: "path/to/kubernetes/manifests"
    github_token: "${{ secrets.GITHUB_TOKEN }}"
```

The following options are supported by this action:

| Name                   	| Description                                                                    	| Required 	| Default 	|
|------------------------	|--------------------------------------------------------------------------------	|----------	|---------	|
| files                  	| A comma-separated list of directories to recursively search for YAML documents 	| false    	| "."     	|
| version                	| Version of Kubernetes to validate against                                      	| false    	| master  	|
| strict                 	| Whether to not to check for extra properties                                   	| false    	| true    	|
| ignore_missing_schemas 	| Whether or not to skip custom resources                                        	| false    	| false   	|
| additional_schemas     	| Comma-seperated list of secondary base URLs used to download schemas           	| false    	| ""      	|
| github_token     	        | Token to authenticate on GitHub API to create the check report           	        | true    	| ""      	|


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💛 Support the project

If this project was useful to you in some form, I would be glad to have your support.  It will help to keep the project alive and to have more time to work on Open Source.

The sinplest form of support is to give a ⭐️ to this repo.

You can also contribute with [GitHub Sponsors](https://github.com/sponsors/brpaz).

[![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-Sponsor%20Me-red?style=for-the-badge)](https://github.com/sponsors/brpaz)


Or if you prefer a one time donation to the project, you can simple:

<a href="https://www.buymeacoffee.com/Z1Bu6asGV" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>


## Authors

👤 **Bruno Paz**

* Website: https://brunopaz.dev
* Twitter: [@brunopaz88](https://twitter.com/brunopaz88)
* Github: [@brpaz](https://github.com/brpaz)


## 📝 License

Copyright © 2020 [Bruno Paz](https://github.com/brpaz)

This project is [MIT](https://opensource.org/licenses/MIT) licensed.