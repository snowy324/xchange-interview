module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '^@src/(.*)': '<rootDir>/src/$1',
    '^@views/(.*)': '<rootDir>/src/views/$1',
    '^@request/(.*)': '<rootDir>/src/request/$1',
    '^@store/(.*)': '<rootDir>/src/store/$1',
    '^@assets/(.*)': '<rootDir>/src/assets/$1',
    '^@pc/(.*)': '<rootDir>/src/views/CloudTravel/components/Pc/$1',
    '^@mobile/(.*)': '<rootDir>/src/views/CloudTravel/components/Mobile/$1',
  }
}
