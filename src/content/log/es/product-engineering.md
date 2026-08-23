---
title: De Software Engineer a Product Engineer
description: El cambio de paradigma que ya está aquí y mi proceso de adaptación
date: 2026-08-15
translationKey: product-engineering
tags: [product, engineering, software]
draft: false
cover: ../_images/product-engineering-cover.png
coverAlt: Ilustración de un robot dándole la mano a una persona sonriente
---

Durante todo 2026, la forma que tenía de trabajar está dando un vuelco vertiginoso. Estamos iterando nuevas _features_ más rápido que nunca, mejorando las existentes casi sin pestañear y, en general, evolucionando todo el ecosistema que hace esto posible a un ritmo frenético. Esto ha hecho que me deje de considerar un _desarrollador_ que se fija en cada línea que escribe, tratando de encontrar el mejor balance entre legibilidad y _performance_ y haya subido unas cuantas capas (muchas) hasta estar en una posición desde la que ver qué aporta más valor al usuario y poder enfocarme en ello. He pasado a considerarme un _ingeniero de producto_.

## El cambio de paradigma que ya está aquí

No voy a explicar lo que ya todos estamos viviendo, en mayor o menor medida, cada día: el _desarrollo agéntico_ (término terrible, si me preguntas) ha irrumpido con fuerza y está aquí para quedarse. Depende de cada uno (y de su empresa, en buena medida) hasta qué nivel lo incorpora en su día a día. Lo que está claro es que mi forma de trabajar no se parece en nada a la de hace exactamente un año. Y esto es bueno.

Necesito dedicar menos tiempo a pensar cómo desarrollar una nueva _feature_ y dedico más tiempo a describir cómo se relaciona con las ya existentes, su _scope_ y lo que puede fallar a su alrededor. El resultado es un producto más robusto y seguro.

Además, esto abre la puerta a pequeños detalles a los que antes nunca prestábamos atención, normalmente por el ratio _tiempo invertido / retorno de la inversión_: transiciones, animaciones y otros detalles de UI que solo aportan valor si todo lo que hay por debajo es útil y funcional.

## Cómo me adapto a ello

Mi forma preferida de aprender siempre ha sido mediante vídeos y cursos, nunca libros. Para mí, es la forma más dinámica y visual de aprender. Ahora, basta con ver los principales creadores de contenido en YouTube para confirmar que todo ha pasado a centrarse en IA: cómo desarrollar con ella, qué harneses usar, _benchmarks_ y comparaciones entre modelos...

En realidad no ha cambiado mucho si lo comparamos con la época pre-IA: cómo desarrollar en X/Y/Z, qué _frameworks_ y librerías usar, comparaciones entre las mismas (sí, me refiero al típico Vue vs React, Java vs Ruby, etc.).

Admito que esta sigue siendo la vía que más me gusta para mantenerme al tanto de todo lo que sale, que no es poco. En lo que llevamos de año hemos pasado por:

- Desarrollar con _planes_
- _Loop engineering_
- _Harness engineering_

Y seguro que me dejo muchos. Honestamente, hay mucho ruido que filtrar últimamente, y hace falta que pase el tiempo para que se asiente una forma de desarrollar. O quizá no, porque no me imagino en qué punto los modelos dejarán de evolucionar y, con ellos, la forma de trabajar. Tenemos años muy interesantes por delante.

## Mi descripción de _Product Engineer_

Hasta ahora he hablado de cómo la IA ha cambiado mi forma de trabajar, pero merece la pena que explique qué considero yo ser un _Ingeniero de producto_, pues, como muchos otros términos en esta industria, puede que tenga diferente significado en función de la persona o empresa en la que te encuentres.

- Métricas: se acabó el ship and forget, o, mejor dicho, el ship and que lo valide el PM.
- La observabilidad

## _High agency_

Creo que una de las habilidades más valiosas de un ingeniero, ahora y siempre, es la _agencia_: ser proactivo dentro del equipo y la compañía, no esperar a que un _manager_ te asigne una tarea o que el equipo entre dentro de un nuevo _sprint_.

Dado que el coste de llevar una _feature_ desde la fase de ideación hasta la puesta en producción (con su consiguiente monitorización), ha caído en picado, la capacidad para encontrar, por iniciativa propia, qué puede aportar valor al producto se ha vuelto una de las principales características de un _product engineer_.

Y esto no necesariamente significa que debamos embarcarnos en la refactorización en Rust de nuestro servicio _core_ o de saltarnos las capas de jerarquía que puedan existir. A veces, simplemente, basta con utilizar el producto que tú mismo estás desarrollando, encontrar un _bug_ y decidir solventarlo, sin necesitar un ticket de JIRA para ello.

## Los roles tradicionales se difuminan

Hasta ahora, en cualquier empresa de producto, encontrábamos tres roles principales: el _software engineer_, el _product designer_ y el _product manager_.
Antes de la IA, las tareas de estos tres perfiles estaban claramente delimitadas: uno definía unas tareas y tiempos de entrega, otro las adaptaba al producto y refinaba, y el último transformaba esos PRD y tickets de JIRA en código. El esfuerzo conjunto de estos perfiles era el que creaba _el producto_.

Ahora, dónde empieza y dónde acaba el trabajo de cada uno de estos perfiles no podría estar más difuminado. Mis compañeros _managers_ son capaces de lanzar fixes o crear métricas dentro del código. Los _designers_ implementar _features_ enteras en el frontend del proyecto. Los ingenieros creamos nuevos diseños desde cero y definimos el _success criteria_, pudiendo validar _end to end_ la adopción e impacto de lo que hemos hecho.

No sé cómo evolucionarán dichos roles, si seguirán fusionándose hasta que una sola persona acabe desempeñando los tres roles (y quizá alguno más por el camino) o seguiremos, cada uno, aportando en lo que mejor se nos da hacer y colaborando más estrechamente que antes.

## ¿Adaptarse o morir?

Mientras nos adaptamos a este nuevo paradigma y desarrollamos las _skills_ necesarias para ello (recordemos que absolutamente todo se puede entrenar y desarrollar), me gusta recordar una frase que he escuchado muchas veces a lo largo de mi carrera: _este trabajo es una carrera de fondo_.

No sé a qué ritmo adoptará la gran mayoría de empresas este incremento de responsabilidades para sus ingenieros, pero estoy seguro de que llegará, en mayor o menor medida. Me cuesta imaginarme, dentro de cinco años, que una empresa siga ofertando puestos de _frontend_, con una metodología _agile_, en un proyecto «estable y con perspectivas de futuro», y que el sector lo vea como algo bueno. Al final, quieres estar del lado ganador (el que más empleabilidad tenga a futuro) y ese es el de un ingeniero de producto.

