import * as THREE from "../potreelibs/libs/three.js/build/three.module.js";
	
		window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));
		//???????
		viewer.setServer("http://localhost:3021");
		viewer.setEDLEnabled(true);
		viewer.setFOV(60);
		viewer.setPointBudget(10_000_000);
		viewer.loadSettingsFromURL();
		
		viewer.setDescription(`ООО "Метур".
		Здание по адресу: Россия, Ростовская область, г. Батайск,<br>
		ул. Комарова, дом № 204. Литер Z8.<br>
		 Съемка выполнена  <a href='https://project-euro.ru/' target=blank>ООО "Евростройпроект"</a> 14.12.2021.`);

		viewer.loadGUI(() => {
			viewer.setLanguage('en');
			$("#menu_tools").next().show();
			$("#menu_scene").next().show();
			viewer.toggleSidebar();
		});
		
		Potree.loadPointCloud("https://storage.yandexcloud.net/potreeclouds/metur20mm/cloud.js", "Metur", async e => {
			let scene = viewer.scene;
			let pointcloud = e.pointcloud;
			let material = pointcloud.material;
			scene.addPointCloud(pointcloud);
			material.pointSizeType = Potree.PointSizeType.FIXED;
			material.size = 1;
			viewer.fitToScreen();
			// ДОБАВЛЯЕМ SHAPE
			{
				const loader = new Potree.ShapefileLoader();
				let shapeNode = new THREE.Object3D();
				viewer.scene.scene.add(shapeNode);

				const shpTopo = await loader.load("https://storage.yandexcloud.net/potreeclouds/metur20mm/shp1/BatMetur1.shp")
				shapeNode.add(shpTopo.node);
				shpTopo.node.traverse(node => {
				if(node.material){
				node.material.color.setRGB(0.5, 0, 0.5)
				}
				});
				// this is necessary so that fat lines are correctly sized
				viewer.addEventListener("update", () => {
				const size = viewer.renderer.getSize(new THREE.Vector2());
				shpTopo.setResolution(size.width, size.height);
				});
					
				viewer.onGUILoaded(() => {
				// Add entry to object list in sidebar
					let tree = $(`#jstree_scene`);
					let parentNode = "other";

					let shpTopoID = tree.jstree('create_node', parentNode, { 
							"text": "topo", 
							"icon": `${Potree.resourcePath}/icons/triangle.svg`,
							"object": shpTopo.node,
							"data": shpTopo.node,
						}, 
						"last", false, false);
					tree.jstree(shpTopo.node.visible ? "check_node" : "uncheck_node", shpTopoID);
				});
			}
			
		});


		/*
		Potree.loadPointCloud("https://storage.yandexcloud.net/potreeclouds/metur20mm/cloud.js", "Metur", function(e){
			viewer.scene.addPointCloud(e.pointcloud);
			
			let material = e.pointcloud.material;
			material.size = 1;
			material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
			
			viewer.fitToScreen();
		
		//SHAPEFILES START
		
		// SHAPEFILES END		
		});
		*/