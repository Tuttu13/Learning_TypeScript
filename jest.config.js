module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // グローバル設定の代わりにtransformを使用
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jestの設定をここに記述
        tsconfig: 'tsconfig.json',
      },
    ],
  },
};