![ZenML ML Engineer](static/logo.png)

# ZenML Frontend Engineer - Coding Challenge

We don't like whiteboard interviews and weekend-filling coding challenges. You're a pro, and we want to give you a 
platform to show that - in an environment you like. Your editor, your machine, your setup. All our challenges will 
be based either directly on the role you applied for or be as similar as they can get because you deserve to get a 
glimpse at what you'll be doing, too.

This challenge is intended to test your knowledge of frontend development, given a simple REST API.

## Summary

**How much time should you spend on this:** 3-5h  
**How much time do you have:** 7 days  
**What should you deliver in the end:** A zipped copy of your solution, including instructions on how to run it (important: including the `.git` folder)

## Instructions

Your task is to create a frontend application that visualizes the contents of the REST API hosted publically here:


[Click here to go to API docs](https://mqlc2m.deta.dev/docs).


The API is a FastAPI python application that manages a publically maintained list of so-called `stacks` (accessible via the `GET /stacks` method). A `stack` is simply a combination of various configurations of infrastructure, namely `stack components`.

A `stack` consists of a series of `stack components`. A `stack component` can be thought of as simple configuration. For example, here is a configuration of a stack component:

```json
{
  "id": "1f6a4f4b-9da3-4085-bd25-45a7255be88a",
  "created": "2022-11-23T15:14:43",
  "updated": "2022-11-23T15:14:43",
  "user": "ef99200c-807a-4efa-b006-303462d6680c",
  "project": "8f55ff0d-bfbd-479c-a7d4-60af51236203",
  "is_shared": false,
  "name": "multi_tenant_kubeflow",
  "type": "orchestrator",
  "flavor": "kubeflow",
  "configuration": {
     "synchronous": false,
     "timeout": 1200,
      "client_args": {},
      "user_namespace": null,
      "node_selectors": {},
      "node_affinity": {},
      "pod_settings": null,
      "kubeflow_pipelines_ui_port": 8080,
      "kubeflow_hostname": "https://www.myshowcase.zenml.io/pipeline",
      "kubeflow_namespace": "kubeflow",
      "kubernetes_context": "zenml-cluster",
      "skip_local_validations": false,
      "skip_cluster_provisioning": false,
      "skip_ui_daemon_provisioning": false
  }
}
```

Every stack component always has an `id`, `name`, `type` and a `flavor`. For example, the above stack component is of type `orchestrator` and flavor `kubeflow`, with id `1f6a4f4b-9da3-4085-bd25-45a7255be88a` and name `multi_tenant_kubeflow`.  The id and name of a stack component is unique. The `configuration` property is a dictionary of primitive data types like an `int`, `string`, `file`, `dict`, and is dynamic for every type and flavor (i.e. not every stack component has a `gpu_limit` configuration property). 

A stack also has a unique id and name and can be created by combining different stack components of different types. For example, one can create a stack that has two stack components: One type `orchestrator` of flavor `kubeflow` and one type `artifact store` of flavor `gcp`. One `stack component` can be part of many `stacks`. Here is an example of a stack consisting of 2 stack components:

```json
{
  "id": "125f317c-1bcf-4497-905d-857b72108af5",
   "created": "2022-11-22T12:34:40",
   "updated": "2022-11-22T12:34:40",
   "user": "ef99200c-807a-4efa-b006-303462d6680c",
   "project": "8f55ff0d-bfbd-479c-a7d4-60af51236203",
   "is_shared": false,
   "name": "my_stack",
   "description": "This is my stack",
   "components": {
     "artifact_store": [
       "0c32dddd-0779-4f12-ab61-a9e88b70d434"
     ],
     "orchestrator": [
       "1f6a4f4b-9da3-4085-bd25-45a7255be88a"
     ]
   }
}
```

At minumum, every stack needs to consist of two stack component types, the `orchestrator` and the `artifact store`. You can also add 6-8 other types of stack component types optionally to a stack. There may be cases of having more than one type of stack component in a stack, but this is usually **NOT** the case.

As you can also see, there are other properties in the stack and stack component like `user`, `project`, `is_shared` etc. You can choose to ignore these properties or make reasonable assumptions about them as you develop your application.

The frontend application you are designing should give the user the ability to navigate these stacks and stack components. We leave it completely up to you as to how you would manage this user experience. However, please keep in mind the following questions:

- What is an ideal way to visualize a stack and a stack component?
- What is the easiest way to navigate these stacks and stack components when they are many of them?
- How does one showcase the connection between a stack and its stack components?
- How can you as the frontend developer create a UI that is 'forward-facing', i.e., if the API adds more functions to create stacks and stack components in the future, how many changes will need to be made to cater to these changes.

You should showcase the answers to the above questions by creating an application that consumes from the API and allows read-only interaction with the API. Please also create a `README.md` markdown file in which you reason through your thought process and describe clearly how you constructed your application. Note down any assumptions you made along the way.

**Note**:
You can use any tool you like, but we suggest using React as this is the framework of choice at ZenML. Additionally, feel free to use any third-party libraries that you wish, including React-based frameworks like Next.js and CSS frameworks like Tailwind.

## What will you be evaluated on

We're not looking for the perfect solution - but we want to get an insight into your problem-solving process. You 
will be evaluated on the following criterion:

- Demonstrating a clear understanding of how to develop React components and manage state.
- Developing an intuitive UI/UX.
- Robustness of your application towards unexpected errors.
- Attention to detail.
- Good quality and well-documented code.

## For bonus points..

If you have some time, please indicate your answers to the following questions. Please note you do NOT need to implement the functionalities asked:

1) How would you add the ability to create a stack and stack component to your application?
2) How would you add the ability to delete a stack and stack component to your application?

## Questions

If at any point you are stuck and would like some help, please feel free to contact us. When you are done, please send the zipped solution to
`careers@zenml.io` for evaluation. We hope you enjoy the challenge and wish you good luck!
