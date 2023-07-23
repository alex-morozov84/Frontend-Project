import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph'

const removedFeatureName = process.argv[2] // название фичи (2-й аргумент скрипта)
const featureState = process.argv[3] // состояние фичи (on/off)

const toggleFunctionName = 'toggleFeatures'
const toggleComponentName = 'ToggleFeatures'

if (!removedFeatureName) {
  throw new Error('Не указан feature flag')
}

if (!featureState) {
  throw new Error('Не указано состояние фичи (on или off)')
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Состояние фичи может быть только on или off')
}

const project = new Project({})

// Поиск во всех файлах
// project.addSourceFilesAtPaths('src/**/*.ts')
// Либо в конкретном файле
project.addSourceFilesAtPaths('src/**/ArticleDetailsPage.tsx')

const files = project.getSourceFiles()

// Определяем является ли нода искомой функцией (toggleFeatures)
function isToggleFunction(node: Node) {
  let isToggleFeatures = false

  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === toggleFunctionName
    ) {
      isToggleFeatures = true
    }
  })

  return isToggleFeatures
}

// Определяем является ли нода искомым компонентом (toggleFeatures)
function isToggleComponent(node: Node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier)

  return identifier?.getText() === toggleComponentName
}

const replaceToggleFunction = (node: Node) => {
  // Находим объект с опциями данной ноды (в нем содержатся аргументы искомой функции)
  const objectOptions = node.getFirstDescendantByKind(
    SyntaxKind.ObjectLiteralExpression,
  )

  if (!objectOptions) return

  // Находим все аргументы функции
  const featureNameProperty = objectOptions.getProperty('name')
  const onFunctionProperty = objectOptions.getProperty('on')
  const offFunctionProperty = objectOptions.getProperty('off')

  // Находим стрелочные функции включения и выключения фичи, а также название фичи
  const onFunction = onFunctionProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction,
  )
  const offFunction = offFunctionProperty?.getFirstDescendantByKind(
    SyntaxKind.ArrowFunction,
  )
  // Название фичи - это строка в кавычках. Кавычки удаляем при помощи slice
  const featureName = featureNameProperty
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    .slice(1, -1)

  if (featureName !== removedFeatureName) return

  if (featureState === 'on') {
    node.replaceWithText(onFunction?.getBody().getText() ?? '')
  }

  if (featureState === 'off') {
    node.replaceWithText(offFunction?.getBody().getText() ?? '')
  }
}

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) =>
  jsxAttributes.find((node) => node.getName() === name)

// Проверка на наличие скобок и удаление их. Компонент может быть обернут в скобки. После удаления лишнего кода, эти скобки также надо удалить
const getReplacedComponent = (attribute?: JsxAttribute) => {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText()

  if (value?.startsWith('(')) {
    return value.slice(1, -1)
  }

  return value
}

const replaceComponent = (node: Node) => {
  // Находим все атрибуты
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute)

  // Находим ноды по названию атрибутов
  const onAttribute = getAttributeNodeByName(attributes, 'on')
  const offAttribute = getAttributeNodeByName(attributes, 'off')

  const featureNameAttribute = getAttributeNodeByName(attributes, 'feature')

  // Название фичи - это строка в кавычках. Кавычки удаляем при помощи slice
  const featureName = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    ?.slice(1, -1)

  if (featureName !== removedFeatureName) return

  const offValue = getReplacedComponent(offAttribute)
  const onValue = getReplacedComponent(onAttribute)

  if (featureState === 'on' && onValue) {
    node.replaceWithText(onValue)
  }

  if (featureState === 'off' && offValue) {
    node.replaceWithText(offValue)
  }
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    // Если нашли требуемую ноду
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      replaceToggleFunction(node)
    }

    // Если нашли требуемую ноду
    if (
      node.isKind(SyntaxKind.JsxSelfClosingElement) &&
      isToggleComponent(node)
    ) {
      replaceComponent(node)
    }
  })
})

project.save()
