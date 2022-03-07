import * as THREE from "../potreelibs/libs/three.js/build/three.module.js";
	
		window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));
		
		viewer.setEDLEnabled(true);
		viewer.setFOV(60);
		viewer.setPointBudget(10_000_000);
		viewer.loadSettingsFromURL();
		
		viewer.setDescription(`ООО "Метур".
		Здание по адресу: Россия, Ростовская область, г. Батайск,<br>
		ул. Комарова, дом № 204. Литер Z8.<br>
		 Съемка выполнена  <a href='https://project-euro.ru/' target=blank>ООО "Евростройпроект"</a> 14.12.2021.`);

		viewer.loadGUI(() => {
			/*viewer.setLanguage('en');
			$("#menu_appearance").next().show();
		*/
			//viewer.toggleSidebar();

			$("#menu_tools").next().show();
			$("#menu_scene").next().show();
			viewer.toggleSidebar();
			viewer.profileWindow.show();
			viewer.profileWindowController.setProfile(viewer.scene.profiles[0]);
		});
		
		
		Potree.loadPointCloud("https://storage.yandexcloud.net/potreeclouds/metur20mm/cloud.js", "Metur", function(e){
			viewer.scene.addPointCloud(e.pointcloud);
			
			let material = e.pointcloud.material;
			material.size = 1;
			material.pointSizeType = Potree.PointSizeType.ADAPTIVE;
			
			viewer.fitToScreen();
		
				
// Начало аннотаций
{
let scene = viewer.scene;
			scene.annotations.add(new Potree.Annotation({
						position: [2207631, 409813, 25],
						cameraPosition: [2207631, 409813, 12],
						cameraTarget: [2207670, 409925, 46],
						title: "Вид внутри"
					}));
			scene.annotations.add(new Potree.Annotation({
						position: [2207648, 409863, 25],
						cameraPosition: [2207648, 409863, 18],
						cameraTarget: [2207680, 409808, 15],
						title: "Вид на подкрановые"
					}));

}			
//Конец аннотаций
{ // PROFILE
			let profile = new Potree.Profile();
			profile.name = "Поперечный профиль";
			profile.setWidth(2)
			profile.addMarker(new THREE.Vector3(2207620, 409845.247, 27.944));
			profile.addMarker(new THREE.Vector3(2207660, 409839.590, 32.451));
			viewer.scene.addProfile(profile);
		}


		});
		