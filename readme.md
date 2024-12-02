# Playwright SauceDemo

Automation Test testing using [Playwright] that will test https://www.saucedemo.com/.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for testing purposes.

### Prerequisites
```


### Installing

First, update npm

```bash
npm install -g npm@10.9.1
```

Then, install qa-backend-mocha

```bash
git clone https://github.com/candradwikusuma/saucedemoPlaywright.git
cd saucedemoPlaywright
npm install
```

### Usage

### How to running all
```bash
npx playwright test
```

### How to running per file with show report
```bash
npx playwright test -- tests/selectItem.spec.js show-report
```

### View results

```bash
npx playwright show-report
```
