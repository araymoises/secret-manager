
![Logo](https://images.falabella.com/v3/assets/blt34d59f5b52e53f95/bltf259922b91cdea06/611c2c7ac44c171460d4de46/Imagotipo_Store_125x32@2x.png)


# Librería de ejemplo

Un respositorio que se puede descargar cuando se necesite crear una librería para servicios de Javascript/Typescript.

## Instalación

Para instalar la librería, se debe correr el siguiente comando:

```bash
  npm run build
```


## Instrucciones

**Nombre de la librería:** Los nombres de las librerías se deben escribir en PascalCase. Ejemplo: `ExampleNewLibrary`.

**Lenguaje:** Se recomienda utilizar Typescript para la creación de la librería, debido a que con este lenguaje se obtiene una mayor compatibilidad con los tipos de import. 
```bash
  import exampleLibrary from 'exampleLibrary';
```
y

```bash
  const exampleLibrary = require('exampleLibrary');
```

**Dependencias:** Se recomienda mantener la librería con la menor cantidad posible de dependencias y que éstas estén actualizadas. Esto, debido a que probablemente sea un proyecto que se toque muy poco y se pretende reducir los problemas que pueda conllevar una dependencia obsoleta o con vulnerabilidades.
