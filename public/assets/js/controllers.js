var controladores = angular.module('controladores',['ui.select', 'ui.mask', 'ngSanitize', 'ui.bootstrap']);

controladores.factory('common', ['$location', function($location) {
    return {
        clave: function (clave) {
            return ('00000' + clave).slice(-5);
        }
    }
}]);

controladores.controller("cliente", ['$scope', '$http', '$modal', '$location', '$routeParams', 'common', function($scope, $http, $modal, $location, $routeParams, common){
    $scope.clave = 0;

    if ($routeParams.clienteId) {
        $http.get("Clientes/getCliente/" + $routeParams.clienteId).success(function (cliente) {
            $scope.cliente = cliente;
            $scope.clave = common.clave(cliente.id);
        });
    } else {
        $http.get("Clientes/nextClave").success(function (response) {
            $scope.clave = common.clave(response.lastId + 1);
        });
    }

    $scope.guardar = function (form) {
        if (form.$invalid) {
            $scope.b = true;
        } else {
            var modal = $modal.open({
                templateUrl: 'partials/guardando.html',
                controller: 'modalCrtl',
                size: 'sm',
                backdrop: 'static',
                resolve: {
                    obj: function () {
                        return {};
                    }
                }
            });
            $http({
                method: "POST",
                url: "clientes/guardar",
                data: $scope.cliente
            }).success(function (response) {
                if (response.success) {
                    modal.close();
                    $location.path("clientes");

                    modal = $modal.open({
                        templateUrl: 'partials/mensaje.html',
                        controller: 'modalCrtl',
                        size: 'sm',
                        resolve: {
                            obj: function () {
                                return {mensaje: "El cliente ha sido guardado con éxito"};
                            }
                        }
                    });
                }
            }).error(function () {
                modal.close();
            });
        }
    }
}]);

controladores.controller("clientes", ['$scope', '$http', 'common', function($scope, $http, common){
    $scope.clientes = [];
    $scope.clave = common.clave;

    $http.get("clientes").success(function (clientes) {
        $scope.clientes = clientes;
    });

}]);

controladores.controller("producto", ['$scope', '$http', '$modal', '$location', '$routeParams', 'common', function($scope, $http, $modal, $location, $routeParams, common){
    $scope.clave = 0;
    if ($routeParams.productoId) {
        $http.get("productos/getProducto/" + $routeParams.productoId).success(function (producto) {
            $scope.producto = producto;
            $scope.clave = common.clave(producto.id);
        });
    } else {
        $http.get("productos/nextClave").success(function (response) {
            $scope.clave = common.clave(response.lastId + 1);
        });
        $scope.producto = {};
    }

    $scope.guardar = function (invalid) {
        if (invalid.$invalid) {
            $scope.b = true;
        } else {
            var modal = $modal.open({
                templateUrl: 'partials/guardando.html',
                controller: 'modalCrtl',
                size: 'sm',
                backdrop: 'static',
                resolve: {
                    obj: function () {
                        return {};
                    }
                }
            });
            $http({
                method: "POST",
                url: "productos/guardar",
                data: $scope.producto
            }).success(function (response) {
                modal.close();
                if (response.success) {
                    $location.path("productos");

                    modal = $modal.open({
                        templateUrl: 'partials/mensaje.html',
                        controller: 'modalCrtl',
                        size: 'sm',
                        resolve: {
                            obj: function () {
                                return {mensaje: "El producto ha sido guardado con éxito"};
                            }
                        }
                    });
                } else {
                    $scope.error = response.error;
                }
            }).error(function () {
                modal.close();
            });
        }
    }
}]);

controladores.controller("configuracion", ['$scope', '$http', '$modal', '$location', '$routeParams', 'common', function($scope, $http, $modal, $location, $routeParams, common){
    $http.get("configuracion").success(function (configuracion) {
        $scope.configuracion = configuracion;
    });

    $scope.guardar = function (invalid) {
        if (invalid.$invalid) {
            $scope.b = true;
        } else {
            var modal = $modal.open({
                templateUrl: 'partials/guardando.html',
                controller: 'modalCrtl',
                size: 'sm',
                backdrop: 'static',
                resolve: {
                    obj: function () {
                        return {};
                    }
                }
            });
            $http({
                method: "POST",
                url: "configuracion/guardar",
                data: $scope.configuracion
            }).success(function (response) {
                modal.close();
                if (response.success) {
                    $location.path("main");

                    modal = $modal.open({
                        templateUrl: 'partials/mensaje.html',
                        controller: 'modalCrtl',
                        size: 'sm',
                        resolve: {
                            obj: function () {
                                return {mensaje: "La configuración ha sido guardada con éxito"};
                            }
                        }
                    });
                } else {
                    $scope.error = response.error;
                }
            }).error(function () {
                modal.close();
            });
        }
    }
}]);

controladores.controller("productos", ['$scope', '$http', 'common', function($scope, $http, common){
    $scope.productos = [];
    $scope.clave = common.clave;

    $http.get("productos").success(function (productos) {
        $scope.productos = productos;
    });

}]);

controladores.controller("ventas", ['$scope', '$http', 'common', function($scope, $http, common){
    $scope.ventas = [];
    $scope.clave = common.clave;
    $scope.fecha = function (fecha) {
        return fecha.slice(0,10);
    };

    $http.get("ventas").success(function (ventas) {
        $scope.ventas = ventas;
    });

}]);

controladores.controller("venta", ['$scope', '$http', '$modal', '$location', 'common', function($scope, $http, $modal, $location, common){
    $scope.venta = {
        rows: []
    };

    $scope.clave = common.clave;

    $http.get("ventas/nextClave").success(function (response) {
        var lastId = !!response.lastId ? response.lastId : 0;

        $scope.claveVenta = $scope.clave(lastId + 1);
    });

    var configuracion;

    $http.get("configuracion").success(function (config) {
        configuracion = config;
    });

    $scope.getClientes = function (search) {
        if (search.length > 2) {
            $http.get("clientes").success(function (clientes) {
                $scope.clientes = clientes;
            });
        } else {
            $scope.clientes = [];
        }
    }

    $scope.getProductos = function (search) {
        if (search.length > 2) {
            $http.get("productos").success(function (productos) {
                $scope.productos = productos;
            });
        } else {
            $scope.productos = [];
        }
    }

    $scope.importe = function (precio, cantidad) {
        cantidad = cantidad ? cantidad : 0;
        return $scope.precio(precio) * cantidad;
    }

    $scope.precio = function (precio) {
        return precio * (1 + (configuracion.tasa * configuracion.plazoMaximo) / 100);
    }

    $scope.guardar = function (venta) {
        if (!venta.total) {
            $scope.errorFinanciamiento = true;
        } else {
            var modal = $modal.open({
                templateUrl: 'partials/guardando.html',
                controller: 'modalCrtl',
                size: 'sm',
                backdrop: 'static',
                resolve: {
                    obj: function () {
                        return {};
                    }
                }
            });
            $http({
                method: "POST",
                url: "ventas/guardar",
                data: venta
            }).success(function (response) {
                modal.close();
                if (response.success) {
                    $location.path("ventas");

                    modal = $modal.open({
                        templateUrl: 'partials/mensaje.html',
                        controller: 'modalCrtl',
                        size: 'sm',
                        resolve: {
                            obj: function () {
                                return {mensaje: "La venta ha sido guardada con éxito"};
                            }
                        }
                    });
                }
            }).error(function () {
                modal.close();
            });
        }
    }

    $scope.seguir = function (invalid) {
        if (invalid) {
            $scope.b = true;
        } else {
            $scope.siguiente = true;
        }
    }

    $scope.enganche = function (rows) {
        if (configuracion && rows.length) {
            var importe = 0;

            rows.forEach(function (row) {
                var cantidad = row.cantidad ? row.cantidad : 0;
                importe += $scope.precio(row.precio) * cantidad;
            });

            return importe * configuracion.enganche / 100;
        }
        return 0;
    };

    $scope.bonificacion = function (rows) {
        if (configuracion && rows.length) {
            var importe = 0;

            rows.forEach(function (row) {
                var cantidad = row.cantidad ? row.cantidad : 0;
                importe += $scope.precio(row.precio) * cantidad;
            });

            var enganche = importe * configuracion.enganche / 100;

            return enganche * configuracion.tasa * configuracion.plazoMaximo / 100
        }
        return 0;
    };

    $scope.total = function (rows) {
        if (configuracion && rows.length) {
            var importe = 0;

            rows.forEach(function (row) {
                var cantidad = row.cantidad ? row.cantidad : 0;
                importe += $scope.precio(row.precio) * cantidad;
            });

            var enganche = importe * configuracion.enganche / 100;
            var bonificacion = enganche * configuracion.tasa * configuracion.plazoMaximo / 100

            return importe - enganche - bonificacion;
        }
        return 0;
    };

    $scope.totalPagar = function (rows, plazo) {
        if (configuracion && rows.length) {
            var total = $scope.total(rows);
            var precioContado = total / (1 + configuracion.tasa * configuracion.plazoMaximo / 100);

            return precioContado * (1 + configuracion.tasa * plazo / 100);
        }

        return 0;
    };

    $scope.add = function(producto) {
        producto.cantidad = 1;
        $scope.venta.rows.push(producto);
    };

    $scope.remove = function (index) {
        $scope.venta.rows.splice(index,1);
    };
}]);

controladores.controller('modalCrtl', ['$scope', '$modalInstance', 'obj', function ($scope, $modalInstance, obj) {
    $scope.obj = obj;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

controladores.controller('fecha', ['$scope', function ($scope) {
    $scope.fecha = function () {
        var fecha = new Date().toJSON().slice(0, 10).split('-');
        return fecha[2] + '/' + fecha[1] + '/' + fecha[0];
    };
}]);

function justNumbers(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46))
        return true;

    return /\d/.test(String.fromCharCode(keynum));
}
